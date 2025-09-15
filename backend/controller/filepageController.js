// listen to filepage route and send all file data

import File from "../schema/file.schema.js";

const fetchFile = async (req, res) => {
  try {
    const files = await File.find({isPublic: true, StatusVerifikasi: "Sudah Verifikasi"});
    if (files.length === 0) {
      res.status(200).send({ message: "No files found in the database" });
    } else {
      res.status(200).send({files:files});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

export default fetchFile;
