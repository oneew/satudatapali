// Frontend service for handling integration API calls

const API_BASE_URL = '/v1/integration';

/**
 * Synchronize a file with external systems
 * @param {string} fileId - ID of the file to synchronize
 * @param {Array} targets - Target systems to synchronize with
 * @returns {Promise<Object>} API response
 */
export const synchronizeFile = async (fileId, targets = ['splp', 'sipd']) => {
    try {
        const response = await fetch(`${API_BASE_URL}/sync/${fileId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Assuming auth token is stored in localStorage
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ targets })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Synchronization error:', error);
        throw error;
    }
};

/**
 * Synchronize all verified files with external systems
 * @param {Array} targets - Target systems to synchronize with
 * @param {number} limit - Maximum number of files to synchronize
 * @returns {Promise<Object>} API response
 */
export const synchronizeAllFiles = async (targets = ['splp', 'sipd'], limit = 100) => {
    try {
        const response = await fetch(`${API_BASE_URL}/sync-all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Assuming auth token is stored in localStorage
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ targets, limit })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Bulk synchronization error:', error);
        throw error;
    }
};

/**
 * Get synchronization status for a file
 * @param {string} fileId - ID of the file to check status for
 * @returns {Promise<Object>} API response
 */
export const getSyncStatus = async (fileId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/status/${fileId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Assuming auth token is stored in localStorage
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Get sync status error:', error);
        throw error;
    }
};

/**
 * Fetch data from an external system
 * @param {string} system - External system to fetch from ('splp' or 'sipd')
 * @param {string} datasetId - ID of the dataset to fetch
 * @param {Object} params - Additional query parameters
 * @returns {Promise<Object>} API response
 */
export const fetchDataFromExternal = async (system, datasetId, params = {}) => {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}/fetch/${system}/${datasetId}${queryParams ? `?${queryParams}` : ''}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Assuming auth token is stored in localStorage
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch from external system error:', error);
        throw error;
    }
};

/**
 * Fetch final data from SIPD e-walidata
 * @param {Object} params - Query parameters (e.g., { kodepemda: '1612' })
 * @returns {Promise<Object>} API response
 */
export const fetchFinalDataFromSipd = async (params = {}) => {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}/sipd/final${queryParams ? `?${queryParams}` : ''}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Assuming auth token is stored in localStorage
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch final data from SIPD error:', error);
        throw error;
    }
};

/**
 * Fetch reference data from SIPD e-walidata
 * @param {Object} params - Query parameters (e.g., { kodepemda: '1612' })
 * @returns {Promise<Object>} API response
 */
export const fetchReferenceDataFromSipd = async (params = {}) => {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}/sipd/reference${queryParams ? `?${queryParams}` : ''}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Assuming auth token is stored in localStorage
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch reference data from SIPD error:', error);
        throw error;
    }
};

/**
 * Send disable request to SIPD e-walidata
 * @param {Object} disableData - Data for disable request
 * @returns {Promise<Object>} API response
 */
export const sendDisableRequestToSipd = async (disableData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/sipd/disable`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Assuming auth token is stored in localStorage
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ disableData })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Send disable request to SIPD error:', error);
        throw error;
    }
};

/**
 * Format synchronization results for display
 * @param {Array} results - Array of synchronization results
 * @returns {Array} Formatted results
 */
export const formatSyncResults = (results) => {
    return results.map(result => ({
        system: result.system.toUpperCase(),
        status: result.success ? 'Success' : 'Failed',
        message: result.message,
        details: result.error || null
    }));
};