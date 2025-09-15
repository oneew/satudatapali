import mongoose from "mongoose";

// Define allowed values for the 'produsen' field
const produsenOptions = ['Option1', 'Option2', 'Option3']; // Replace with actual options

const fileSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,  
    },
    name: {
        type: String,
        required: true,
    },
    temadataset: {
        type: String,
        required: true,
    },
    metaData: {
        produsen: {
            type: String,
            required: true,
        },
        cakupandata: {
            type: String,
            required: true,
        },
        frekuensi: {
            type: String,
            required: true,
        },
        dimensidataset: {
            type: String,
            required: true,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    // Reference to user who uploaded the file
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User ",
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        enum: ['pdf', 'doc', 'docx', 'xls', 'xlsx'], // Restrict to specific file types
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    StatusVerifikasi: {
        type: String,
        enum: ['Belum Verifikasi', 'Sudah Verifikasi', 'Ditolak'],
        default: 'Belum Verifikasi',
    },
});

// Create model
const File = mongoose.model("File", fileSchema);

export default File;