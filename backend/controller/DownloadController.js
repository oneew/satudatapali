import path from "path";

import File from "../schema/file.schema.js";

const DownloadController = async (req, res) => {
    const file = await File.findById(req.params.id);
    const FileName = file.filename;
    const filePath = path.join('public','files', FileName);

    if (!filePath) {
        return res.status(404).json({ message: "File not found", file: filePath });
    }

    res.download(filePath, (error) => {
        if (error) {
            res.status(500).json({ message: "Error downloading file" });
        }
    });
}

export default DownloadController;