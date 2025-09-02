  import { cloudinary } from "../Config/cloudinary.js";
  import multer from "multer";
  import { CloudinaryStorage } from "multer-storage-cloudinary";
  import "dotenv/config";

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads",
      allowed_formats: ["jpeg", "jpg", "png","webp"],
      public_id: (req, file) => {
        console.log("Uploading to cloudinary:", file.originalname);
        return `${file.originalname}-${Date.now()}`;
      },
    },
  });
  let upload = multer({ storage });
  export default upload;
