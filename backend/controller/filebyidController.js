import File from "../schema/file.schema.js";

const fetchFileById = async (req, res) => {
    try {
      const fileId = req.params.id;
      const file = await File.findById(fileId); // Assuming you are using Mongoose
  
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
  
      res.status(200).json({
        message: "File fetched successfully",
        files: file, // Return the file in an array to match the frontend structure
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching file details" });
    }
  };

export default fetchFileById;