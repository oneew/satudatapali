import File from "../schema/file.schema.js";

const getFileByUser = async (req, res) => {
  
  try {
    if (req.role === "Admin" || req.role === "admin" || req.role === "Validator") {
      const filesforadmin = await File.find();
      return res.send(filesforadmin); // Use return to prevent further execution
    }

    const filesforuser = await File.find({ user: req.user._id });
    return res.send(filesforuser); // Use return to prevent further execution
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getFileByUser;
