import mongoose from "mongoose";
import File from "../../schema/file.schema.js";
import fs from "fs";
import path from "path";

const FileEdit = async (req, res) => {
  if (req.role !== "Operator") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const fileId = req.params.id;
  const file = req.file;
  const {
    name,
    temadataset,
    produsen,
    cakupandata,
    frekuensi,
    dimensidataset,
    isPublic,
  } = req.body;

  try {
    const updatedfile = await File.findByIdAndUpdate(
      fileId,
      {
        name,
        temadataset,
        metaData: {
          produsen,
          cakupandata,
          frekuensi,
          dimensidataset,
        },
        isPublic,
        filename: file.filename,
        fileType: file.mimetype.split("/")[1],
        StatusVerifikasi: "Belum Verifikasi",
      },
      { new: true }
    );

    if (!updatedfile) {
      return res.status(404).json({ message: "File not found" });
    }

    // return updated file
    return res.status(200).json({message: "File Berhasil diperbarui", updatedfile});
  } catch (error) {
    console.error(error);
    if (req.file) {
      const filePath = path.join("public/files", req.file.filename);
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error(error);
        }
      });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default FileEdit;
