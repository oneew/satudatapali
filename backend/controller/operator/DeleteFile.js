import fs from "fs";
import File from "../../schema/file.schema.js";

const DeleteFile = async (req, res) => {
    const fileId = req.params.id;
    const filefound = await File.findById(fileId);
    
    if (!filefound) {
        return res.status(404).json({ message: "File not found" });
    }

    const filename = filefound.filename;
    const filePath = `public/files/${filename}`;

    try {
        await File.findByIdAndDelete(fileId);
        fs.unlinkSync(filePath);
        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting file" });
    }
}

export default DeleteFile;