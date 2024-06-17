import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads", //to store images here
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, uniqueSuffix + extension);
  },
});
const maxSize = 1024 * 1024 * 2; //2 mb validation for an img

const fileFilter = (req, file, cb) => {
  if (
    !file.mimetype.includes("jpeg") &&
    !file.mimetype.includes("jpg") &&
    !file.mimetype.includes("png")
  ) {
    return cb(null, flase, new Error("only images are allowed"));
  }
  cb(null, true);
};

//to take img in backend we should use multer
const upload = multer({
  storage: storage,
  limit: maxSize,
  fileFilter: fileFilter,
});

export default upload;
