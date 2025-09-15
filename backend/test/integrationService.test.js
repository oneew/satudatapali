import ExternalIntegrationService from '../services/externalIntegrationService.js';

// Mock the environment variables
process.env.SPLP_API_URL = 'https://api.splp-satudata-indonesia.go.id/v1';
process.env.SIPD_API_URL = 'https://api.sipd-ewalidata.go.id/v1';
process.env.EXTERNAL_API_KEY = 'test-api-key';

// Mock data for testing
const mockFileData = {
    _id: '60f7b3b3f3b3f3b3f3b3f3b3',
    name: 'Test Dataset',
    temadataset: 'Economy',
    metaData: {
        produsen: 'Ministry of Finance',
        cakupandata: 'National',
        frekuensi: 'Annual',
        dimensidataset: 'Time Series',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
    },
    filename: 'test-data.xlsx',
    fileType: 'xlsx',
    isPublic: true,
    StatusVerifikasi: 'Sudah Verifikasi',
};

describe('ExternalIntegrationService', () => {
    let integrationService;

    beforeEach(() => {
        integrationService = new ExternalIntegrationService();
    });

    test('should prepare SPLP data correctly', () => {
        const splpData = integrationService.prepareSplpData(mockFileData);
        
        expect(splpData).toEqual({
            dataset_id: '60f7b3b3f3b3f3b3f3b3f3b3',
            dataset_name: 'Test Dataset',
            theme: 'Economy',
            producer: 'Ministry of Finance',
            coverage: 'National',
            frequency: 'Annual',
            dimension: 'Time Series',
            file_name: 'test-data.xlsx',
            file_type: 'xlsx',
            is_public: true,
            verification_status: 'Sudah Verifikasi',
            created_at: new Date('2023-01-01'),
            updated_at: new Date('2023-01-01'),
        });
    });

    test('should prepare SIPD data correctly', () => {
        const sipdData = integrationService.prepareSipdData(mockFileData);
        
        expect(sipdData).toEqual({
            id_dataset: '60f7b3b3f3b3f3b3f3b3f3b3',
            nama_dataset: 'Test Dataset',
            tema_dataset: 'Economy',
            produsen_data: 'Ministry of Finance',
            cakupan_data: 'National',
            frekuensi_data: 'Annual',
            dimensi_data: 'Time Series',
            nama_file: 'test-data.xlsx',
            tipe_file: 'xlsx',
            publik: 'Ya',
            status_verifikasi: 'Sudah Verifikasi',
            tanggal_dibuat: new Date('2023-01-01'),
            tanggal_diubah: new Date('2023-01-01'),
        });
    });

    test('should validate SPLP data correctly', () => {
        // This test would require importing the validation function directly
        // For now, we'll test through the prepare function
        expect(() => {
            integrationService.prepareSplpData(mockFileData);
        }).not.toThrow();
    });

    test('should throw error for invalid SPLP data', () => {
        const invalidData = { ...mockFileData, fileType: 'invalid' };
        
        expect(() => {
            integrationService.prepareSplpData(invalidData);
        }).toThrow('SPLP data validation failed');
    });

    test('should throw error for invalid SIPD data', () => {
        const invalidData = { ...mockFileData, fileType: 'invalid' };
        
        expect(() => {
            integrationService.prepareSipdData(invalidData);
        }).toThrow('SIPD data validation failed');
    });
});