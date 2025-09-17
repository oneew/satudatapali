/**
 * Utility functions for transforming and validating data for external system integrations
 */

/**
 * Validate data according to SPLP Satu Data Indonesia standards
 * @param {Object} data - Data to validate
 * @returns {Object} Validation result
 */
export const validateSplpData = (data) => {
    const errors = [];
    
    // Check required fields
    if (!data.dataset_name) errors.push('Dataset name is required');
    if (!data.theme) errors.push('Theme is required');
    if (!data.producer) errors.push('Producer is required');
    if (!data.coverage) errors.push('Coverage is required');
    if (!data.frequency) errors.push('Frequency is required');
    if (!data.dimension) errors.push('Dimension is required');
    if (!data.file_name) errors.push('File name is required');
    if (!data.file_type) errors.push('File type is required');
    
    // Validate file type
    const validFileTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];
    if (!validFileTypes.includes(data.file_type)) {
        errors.push(`Invalid file type. Must be one of: ${validFileTypes.join(', ')}`);
    }
    
    // Validate verification status
    const validStatuses = ['Belum Verifikasi', 'Sudah Verifikasi', 'Ditolak'];
    if (!validStatuses.includes(data.verification_status)) {
        errors.push(`Invalid verification status. Must be one of: ${validStatuses.join(', ')}`);
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validate data according to SIPD e-walidata standards
 * @param {Object} data - Data to validate
 * @returns {Object} Validation result
 */
export const validateSipdData = (data) => {
    const errors = [];
    
    // Check required fields
    if (!data.nama_dataset) errors.push('Nama dataset is required');
    if (!data.tema_dataset) errors.push('Tema dataset is required');
    if (!data.produsen_data) errors.push('Produsen data is required');
    if (!data.cakupan_data) errors.push('Cakupan data is required');
    if (!data.frekuensi_data) errors.push('Frekuensi data is required');
    if (!data.dimensi_data) errors.push('Dimensi data is required');
    if (!data.nama_file) errors.push('Nama file is required');
    if (!data.tipe_file) errors.push('Tipe file is required');
    
    // Validate file type
    const validFileTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];
    if (!validFileTypes.includes(data.tipe_file)) {
        errors.push(`Invalid file type. Must be one of: ${validFileTypes.join(', ')}`);
    }
    
    // Validate public status
    const validPublicStatus = ['Ya', 'Tidak'];
    if (!validPublicStatus.includes(data.publik)) {
        errors.push(`Invalid public status. Must be one of: ${validPublicStatus.join(', ')}`);
    }
    
    // Validate verification status
    const validStatuses = ['Belum Verifikasi', 'Sudah Verifikasi', 'Ditolak'];
    if (!validStatuses.includes(data.status_verifikasi)) {
        errors.push(`Invalid verification status. Must be one of: ${validStatuses.join(', ')}`);
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Transform SPLP response to local format
 * @param {Object} splpData - Data from SPLP API
 * @returns {Object} Transformed data
 */
export const transformSplpToLocal = (splpData) => {
    return {
        _id: splpData.dataset_id,
        name: splpData.dataset_name,
        temadataset: splpData.theme,
        metaData: {
            produsen: splpData.producer,
            cakupandata: splpData.coverage,
            frekuensi: splpData.frequency,
            dimensidataset: splpData.dimension,
            createdAt: splpData.created_at,
            updatedAt: splpData.updated_at,
        },
        filename: splpData.file_name,
        fileType: splpData.file_type,
        isPublic: splpData.is_public,
        StatusVerifikasi: splpData.verification_status,
    };
};

/**
 * Transform SIPD response to local format
 * @param {Object} sipdData - Data from SIPD API
 * @returns {Object} Transformed data
 */
export const transformSipdToLocal = (sipdData) => {
  // Handle case where sipdData might be null or undefined
  if (!sipdData || typeof sipdData !== 'object') {
    return {};
  }
  
  return {
    _id: sipdData.id_dataset || '',
    name: sipdData.nama_dataset || '',
    temadataset: sipdData.tema_dataset || '',
    metaData: {
      produsen: sipdData.produsen_data || '',
      cakupandata: sipdData.cakupan_data || '',
      frekuensi: sipdData.frekuensi_data || '',
      dimensidataset: sipdData.dimensi_data || '',
      createdAt: sipdData.tanggal_dibuat || null,
      updatedAt: sipdData.tanggal_diubah || null,
    },
    filename: sipdData.nama_file || '',
    fileType: sipdData.tipe_file || '',
    isPublic: sipdData.publik === 'Ya',
    StatusVerifikasi: sipdData.status_verifikasi || 'Belum Verifikasi',
  };
};

/**
 * Format date to ISO string
 * @param {Date} date - Date to format
 * @returns {string} ISO formatted date string
 */
export const formatISODate = (date) => {
    return date ? new Date(date).toISOString() : null;
};

/**
 * Normalize text data
 * @param {string} text - Text to normalize
 * @returns {string} Normalized text
 */
export const normalizeText = (text) => {
    if (!text) return '';
    return text.toString().trim();
};