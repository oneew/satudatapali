import multer from "multer";

const acceptedMimeType = 
  {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/msword": "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.ms-excel": "xlsx",
  };

const fileupload = multer({
  limits: {
    fileSize: 5000000, //5MB Max
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/files");
    },
    filename: (req, file, cb) => {
      const currentUser = req.user;
      const ext = acceptedMimeType[file.mimetype];
      const date = new Date().toJSON().slice(0, 19).replace(/:/g, "_");
      const filename = `${currentUser}_${date}`;
      cb(null, filename + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!acceptedMimeType[file.mimetype];
    let err = isValid
      ? null
      : new Error({ message: "File type is not supported" });
    cb(err, isValid);
  },
});

export default fileupload;
