import { cloudinary } from "../Config/cloudinary.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpeg", "jpg", "png", "webp"],
    public_id: (req, file) => {
      console.log("Uploading to Cloudinary:", file.originalname); 
      return `${file.originalname.split(".")[0]}-${Date.now()}`;  
    },
  },
});

const upload = multer({ storage });

export default upload;
