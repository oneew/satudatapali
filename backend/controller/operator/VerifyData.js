import File from "../../schema/file.schema.js";

const VerifyData = async (req, res) => {
    if (req.role !== "Validator") {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        const fileId = req.params.id;
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        file.StatusVerifikasi = "Sudah Verifikasi";
        await file.save();
        res.status(200).json({ message: "Data Sudah Diverifikasi" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error verifying data" });
        }
    }

export default VerifyData;