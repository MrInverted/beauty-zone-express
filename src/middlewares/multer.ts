import fs from 'fs';
import path from "path";
import multer from "multer";

const dirname = path.resolve();
export const uploadsPath = path.join(dirname, "/uploads");

const renameFile = (file?: Express.Multer.File) => {
  if (!file) return;

  const { filename, originalname } = file;

  const oldPath = path.join(dirname, "/uploads/", filename);
  const newPath = path.join("/uploads/", Date.now() + "---" + originalname);
  const newPathWithDirname = path.join(dirname, newPath);

  fs.renameSync(oldPath, newPathWithDirname);

  return newPath;
}

const multerUpload = multer({
  dest: uploadsPath,
  fileFilter(req, file, callback) {
    const isJpg = file.mimetype === "image/jpeg" || file.mimetype === "image/jpg";
    const isPng = file.mimetype === "image/png";
    const isImage = isJpg || isPng;

    if (isImage) return callback(null, true);

    return callback(new Error("It is not an image!!!"));
  },
})

const multerFields: multer.Field[] = [
  { name: "mainFile" },
  { name: "portfolio" }
]

const multerWithFields = multerUpload.fields(multerFields);
const multerComment = multerUpload.single("file");

export { multerWithFields, multerComment, renameFile }