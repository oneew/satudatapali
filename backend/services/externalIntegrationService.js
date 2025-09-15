import axios from 'axios';
import { 
    validateSplpData, 
    validateSipdData,
    transformSplpToLocal,
    transformSipdToLocal
} from '../utils/dataTransformer.js';

// Service to handle integrations with external systems
class ExternalIntegrationService {
    constructor() {
        // Configuration for external APIs
        this.splpApiUrl = process.env.SPLP_API_URL || '';
        this.sipdApiUrl = process.env.SIPD_API_URL || 'https://sipd.go.id/ewalidata/serv';
        this.sipdApiKey = process.env.SIPD_API_KEY || 'f382e18190ff14aa1d2771f489f4fb93'; // Default to the provided key
        
        // Axios instance with default configuration
        this.apiClient = axios.create({
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Prepare data for SPLP Satu Data Indonesia integration
     * @param {Object} fileData - The file data from local database
     * @returns {Object} Formatted data for SPLP API
     */
    prepareSplpData(fileData) {
        // Transform local data structure to SPLP format
        const splpData = {
            dataset_id: fileData._id,
            dataset_name: fileData.name,
            theme: fileData.temadataset,
            producer: fileData.metaData.produsen,
            coverage: fileData.metaData.cakupandata,
            frequency: fileData.metaData.frekuensi,
            dimension: fileData.metaData.dimensidataset,
            file_name: fileData.filename,
            file_type: fileData.fileType,
            is_public: fileData.isPublic,
            verification_status: fileData.StatusVerifikasi,
            created_at: fileData.metaData.createdAt,
            updated_at: fileData.metaData.updatedAt,
            // Add any additional fields required by SPLP
        };

        // Validate the data
        const validation = validateSplpData(splpData);
        if (!validation.isValid) {
            throw new Error(`SPLP data validation failed: ${validation.errors.join(', ')}`);
        }

        return splpData;
    }

    /**
     * Prepare data for SIPD e-walidata integration
     * @param {Object} fileData - The file data from local database
     * @returns {Object} Formatted data for SIPD API
     */
    prepareSipdData(fileData) {
        // Transform local data structure to SIPD format
        const sipdData = {
            id_dataset: fileData._id,
            nama_dataset: fileData.name,
            tema_dataset: fileData.temadataset,
            produsen_data: fileData.metaData.produsen,
            cakupan_data: fileData.metaData.cakupandata,
            frekuensi_data: fileData.metaData.frekuensi,
            dimensi_data: fileData.metaData.dimensidataset,
            nama_file: fileData.filename,
            tipe_file: fileData.fileType,
            publik: fileData.isPublic ? 'Ya' : 'Tidak',
            status_verifikasi: fileData.StatusVerifikasi,
            tanggal_dibuat: fileData.metaData.createdAt,
            tanggal_diubah: fileData.metaData.updatedAt,
            // Add any additional fields required by SIPD
        };

        // Validate the data
        const validation = validateSipdData(sipdData);
        if (!validation.isValid) {
            throw new Error(`SIPD data validation failed: ${validation.errors.join(', ')}`);
        }

        return sipdData;
    }

    /**
     * Send data to SPLP Satu Data Indonesia
     * @param {Object} formattedData - Data formatted for SPLP API
     * @returns {Promise<Object>} API response
     */
    async sendToSplp(formattedData) {
        try {
            if (!this.splpApiUrl) {
                throw new Error('SPLP API URL not configured');
            }

            const response = await this.apiClient.post(
                `${this.splpApiUrl}/datasets`, 
                formattedData
            );
            
            return {
                success: true,
                data: response.data,
                message: 'Data successfully sent to SPLP'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to send data to SPLP'
            };
        }
    }

    /**
     * Send data to SIPD e-walidata (push_dssd)
     * @param {Object} formattedData - Data formatted for SIPD API
     * @returns {Promise<Object>} API response
     */
    async sendToSipd(formattedData) {
        try {
            const response = await this.apiClient.post(
                `${this.sipdApiUrl}/push_dssd?key=${this.sipdApiKey}`, 
                formattedData
            );
            
            return {
                success: true,
                data: response.data,
                message: 'Data successfully sent to SIPD e-walidata'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to send data to SIPD e-walidata'
            };
        }
    }

    /**
     * Send disable request to SIPD e-walidata (push_disable_dssd)
     * @param {Object} disableData - Data for disable request
     * @returns {Promise<Object>} API response
     */
    async sendDisableToSipd(disableData) {
        try {
            const response = await this.apiClient.post(
                `${this.sipdApiUrl}/push_disable_dssd?key=${this.sipdApiKey}`, 
                disableData
            );
            
            return {
                success: true,
                data: response.data,
                message: 'Disable request successfully sent to SIPD e-walidata'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to send disable request to SIPD e-walidata'
            };
        }
    }

    /**
     * Fetch data from SIPD e-walidata (get_dssd)
     * @param {string} kodepemda - Kode pemda
     * @returns {Promise<Object>} API response
     */
    async fetchFromSipd(kodepemda = '1612') {
        try {
            const response = await this.apiClient.get(
                `${this.sipdApiUrl}/get_dssd?key=${this.sipdApiKey}&kodepemda=${kodepemda}`
            );
            
            // Transform the response to local format
            // Note: This would need to be adapted based on the actual response structure
            const localData = response.data.map(item => transformSipdToLocal(item));
            
            return {
                success: true,
                data: localData,
                raw: response.data,
                message: 'Data successfully fetched from SIPD e-walidata'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to fetch data from SIPD e-walidata'
            };
        }
    }

    /**
     * Fetch final data from SIPD e-walidata (get_dssd_final)
     * @param {string} kodepemda - Kode pemda
     * @returns {Promise<Object>} API response
     */
    async fetchFinalFromSipd(kodepemda = '1612') {
        try {
            const response = await this.apiClient.get(
                `${this.sipdApiUrl}/get_dssd_final?key=${this.sipdApiKey}&kodepemda=${kodepemda}`
            );
            
            // Transform the response to local format
            // Note: This would need to be adapted based on the actual response structure
            const localData = response.data.map(item => transformSipdToLocal(item));
            
            return {
                success: true,
                data: localData,
                raw: response.data,
                message: 'Final data successfully fetched from SIPD e-walidata'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to fetch final data from SIPD e-walidata'
            };
        }
    }

    /**
     * Fetch reference data from SIPD e-walidata (get_ref_dssd)
     * @param {string} kodepemda - Kode pemda
     * @returns {Promise<Object>} API response
     */
    async fetchReferenceFromSipd(kodepemda = '1612') {
        try {
            const response = await this.apiClient.get(
                `${this.sipdApiUrl}/get_ref_dssd?key=${this.sipdApiKey}&kodepemda=${kodepemda}`
            );
            
            return {
                success: true,
                data: response.data,
                message: 'Reference data successfully fetched from SIPD e-walidata'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to fetch reference data from SIPD e-walidata'
            };
        }
    }

    /**
     * Synchronize a file with external systems
     * @param {Object} fileData - The file data to synchronize
     * @param {Array} targets - Array of target systems ('splp', 'sipd')
     * @returns {Promise<Array>} Results for each target system
     */
    async synchronizeFile(fileData, targets = ['splp', 'sipd']) {
        const results = [];
        
        // Prepare and send data to target systems
        if (targets.includes('splp')) {
            try {
                const splpData = this.prepareSplpData(fileData);
                const splpResult = await this.sendToSplp(splpData);
                results.push({ system: 'splp', ...splpResult });
            } catch (error) {
                results.push({ 
                    system: 'splp', 
                    success: false, 
                    error: error.message, 
                    message: 'Failed to synchronize with SPLP' 
                });
            }
        }
        
        if (targets.includes('sipd')) {
            try {
                const sipdData = this.prepareSipdData(fileData);
                const sipdResult = await this.sendToSipd(sipdData);
                results.push({ system: 'sipd', ...sipdResult });
            } catch (error) {
                results.push({ 
                    system: 'sipd', 
                    success: false, 
                    error: error.message, 
                    message: 'Failed to synchronize with SIPD e-walidata' 
                });
            }
        }
        
        return results;
    }

    /**
     * Fetch data from SPLP Satu Data Indonesia
     * @param {string} datasetId - ID of the dataset to fetch
     * @returns {Promise<Object>} API response
     */
    async fetchFromSplp(datasetId) {
        try {
            if (!this.splpApiUrl) {
                throw new Error('SPLP API URL not configured');
            }

            const response = await this.apiClient.get(
                `${this.splpApiUrl}/datasets/${datasetId}`
            );
            
            // Transform the response to local format
            const localData = transformSplpToLocal(response.data);
            
            return {
                success: true,
                data: localData,
                raw: response.data,
                message: 'Data successfully fetched from SPLP'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to fetch data from SPLP'
            };
        }
    }
}

export default ExternalIntegrationService;