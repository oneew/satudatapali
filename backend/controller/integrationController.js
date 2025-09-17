import File from '../schema/file.schema.js';
import ExternalIntegrationService from '../services/externalIntegrationService.js';

// Initialize the external integration service
const integrationService = new ExternalIntegrationService();

/**
 * Synchronize a specific file with external systems
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const synchronizeFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        const { targets } = req.body; // Array of target systems: ['splp', 'sipd']

        // Fetch file from database
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ 
                success: false, 
                message: 'File not found' 
            });
        }

        // Synchronize with external systems
        const results = await integrationService.synchronizeFile(file, targets);

        // Check if any synchronization failed
        const hasErrors = results.some(result => !result.success);
        
        if (hasErrors) {
            return res.status(200).json({
                success: false,
                message: 'Synchronization completed with some errors',
                results
            });
        }

        res.status(200).json({
            success: true,
            message: 'File successfully synchronized with external systems',
            results
        });
    } catch (error) {
        console.error('Synchronization error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error during synchronization',
            error: error.message
        });
    }
};

/**
 * Synchronize all verified files with external systems
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const synchronizeAllFiles = async (req, res) => {
    try {
        const { targets, limit } = req.body; // targets: ['splp', 'sipd'], limit: number of files to sync

        // Fetch verified files from database
        const query = { StatusVerifikasi: 'Sudah Verifikasi' };
        const files = await File.find(query).limit(limit || 100);

        if (files.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No verified files found for synchronization' 
            });
        }

        // Synchronize each file
        const allResults = [];
        for (const file of files) {
            try {
                const results = await integrationService.synchronizeFile(file, targets);
                allResults.push({
                    fileId: file._id,
                    fileName: file.name,
                    results
                });
            } catch (fileError) {
                allResults.push({
                    fileId: file._id,
                    fileName: file.name,
                    error: fileError.message
                });
            }
        }

        res.status(200).json({
            success: true,
            message: `Synchronized ${files.length} files with external systems`,
            results: allResults
        });
    } catch (error) {
        console.error('Bulk synchronization error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error during bulk synchronization',
            error: error.message
        });
    }
};

/**
 * Fetch data from external systems
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const fetchDataFromExternal = async (req, res) => {
    try {
        const { system, datasetId } = req.params;

        let result;
        if (system === 'splp') {
            result = await integrationService.fetchFromSplp(datasetId);
        } else if (system === 'sipd') {
            // For SIPD, we'll use the kodepemda from query parameters or default to '1612'
            const kodepemda = req.query.kodepemda || '1612';
            result = await integrationService.fetchFromSipd(kodepemda);
        } else {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid system specified. Use "splp" or "sipd"' 
            });
        }

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message,
                error: result.error
            });
        }

        res.status(200).json({
            success: true,
            message: `Data successfully fetched from ${system.toUpperCase()}`,
            data: result.data
        });
    } catch (error) {
        console.error('Fetch from external system error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error while fetching data',
            error: error.message
        });
    }
};

/**
 * Fetch final data from SIPD e-walidata
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const fetchFinalDataFromSipd = async (req, res) => {
  try {
    const { kodepemda } = req.query;
    
    // Validate input
    if (kodepemda && (typeof kodepemda !== 'string' || kodepemda.trim() === '')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid kodepemda parameter',
        error: 'Kodepemda must be a non-empty string'
      });
    }
    
    const result = await integrationService.fetchFinalFromSipd(kodepemda || '1612');

    // Log the result for debugging
    console.log('SIPD fetch result:', JSON.stringify(result, null, 2));

    if (!result.success) {
      // Return more detailed error information
      return res.status(400).json({
        success: false,
        message: result.message || 'Failed to fetch data from SIPD',
        error: result.error || 'Unknown error occurred',
        raw: result.raw || null // Include raw data if available
      });
    }

    res.status(200).json({
      success: true,
      message: 'Final data successfully fetched from SIPD e-walidata',
      data: result.data
    });
  } catch (error) {
    console.error('Fetch final data from SIPD error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error while fetching final data from SIPD',
      error: error.message
    });
  }
};

/**
 * Fetch reference data from SIPD e-walidata
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const fetchReferenceDataFromSipd = async (req, res) => {
    try {
        const { kodepemda } = req.query;
        const result = await integrationService.fetchReferenceFromSipd(kodepemda || '1612');

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message,
                error: result.error
            });
        }

        res.status(200).json({
            success: true,
            message: 'Reference data successfully fetched from SIPD e-walidata',
            data: result.data
        });
    } catch (error) {
        console.error('Fetch reference data from SIPD error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error while fetching reference data from SIPD',
            error: error.message
        });
    }
};

/**
 * Send disable request to SIPD e-walidata
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const sendDisableRequestToSipd = async (req, res) => {
    try {
        const { disableData } = req.body;
        const result = await integrationService.sendDisableToSipd(disableData);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message,
                error: result.error
            });
        }

        res.status(200).json({
            success: true,
            message: 'Disable request successfully sent to SIPD e-walidata',
            data: result.data
        });
    } catch (error) {
        console.error('Send disable request to SIPD error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error while sending disable request to SIPD',
            error: error.message
        });
    }
};

/**
 * Get synchronization status for a file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getSyncStatus = async (req, res) => {
    try {
        const fileId = req.params.id;

        // Fetch file from database
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ 
                success: false, 
                message: 'File not found' 
            });
        }

        // In a real implementation, you would check the actual sync status
        // This is a placeholder implementation
        const syncStatus = {
            fileId: file._id,
            fileName: file.name,
            lastSync: file.metaData.updatedAt,
            splpSynced: false, // Would be determined by checking actual sync status
            sipdSynced: false, // Would be determined by checking actual sync status
            verificationStatus: file.StatusVerifikasi
        };

        res.status(200).json({
            success: true,
            message: 'Sync status retrieved successfully',
            data: syncStatus
        });
    } catch (error) {
        console.error('Get sync status error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error while retrieving sync status',
            error: error.message
        });
    }
};