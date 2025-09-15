import mongoose from "mongoose";
import File from "../schema/file.schema.js"; // Import the File model
import fs from "fs"; // Import the fs module
import path from "path";

const fileUploadController = async (req, res) => {
  // Hanya Role Operator yang Boleh Upload File
  if (req.role !== "Operator") {
    return res.status(403).json({ message: "Forbidden" });
    }

  try {
    const file = req.file;

    // Extract other fields from the request body
    const {
      name,
      temadataset,
      produsen,
      cakupandata,
      frekuensi,
      dimensidataset,
      isPublic,
    } = req.body;

    // Create a new file entry in the database
    const _id = new mongoose.Types.ObjectId();
    const newFile = new File({
        _id,
      name,
      temadataset,
      metaData: {
        produsen,
        cakupandata,
        frekuensi,
        dimensidataset,
      },
      userId: req.id, // Assuming req.user is populated by the auth middleware
      filename: file.filename,
      fileType: file.mimetype.split("/")[1], // Extracting file type from the mime type
      isPublic: isPublic === "true", // Convert string to boolean
    });
    
    // Save the file entry to the database
    await newFile.save();

    res.status(200).send({ message: "File Berhasil Di Unggah" });
  } catch (error) {
    if (req.file) {
        const filePath = path.join('public/files', req.file.filename);
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error(error);
        }
      });
    }
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

export default fileUploadController;
