import multer from "multer";
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(import.meta.url);





export const fileValidation = {
  image: ["image/jpeg", "image/png", "image/gif"],
  file: ["application/pdf", "application/msword"],
  video: ["video/mp4"],
};


export function fileUpload(customPath = "general", customValidation = []) {
  console.log("first")
  const fullPath = path.join(__dirname, "..", "..", "uploads", `${customPath}`);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  console.log("second")

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
  console.log(file)
  console.log("second")

      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const fullName =
        Date.now() +
        "-" +
        nanoid() +
        Math.round(Math.random() * 1e9) +
        file.name;
      file.finalDest = `uploads/${customPath}/${fullName}`;
      cb(null, fullName);
    },
  });
  console.log(storage)

  function fileFilter(req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("In-valid file format", false);
    }
  }
  const upload = multer({ storage, fileFilter });
  return upload;
}

