import File from "../../schema/file.schema.js";

const RejectData = async (req, res) => {
    if (req.role !== "Validator") {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        const fileId = req.params.id;
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        file.StatusVerifikasi = "Ditolak";
        await file.save();
        res.status(200).json({ message: "Data Sudah Ditolak" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error rejecting data" });
    }
}

export default RejectData;