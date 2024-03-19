import multer, { memoryStorage } from "multer";
import { Router } from "express";
import { uploadFileToS3 } from "../../lib/S3/uploadFileToS3.js";
import { deleteFileFromS3 } from "../../lib/S3/deleteFileFromS3.js";
const router = Router();

// Limits size of 10MB
const sizeLimits = { fileSize: 1024 * 1024 * 10 };

// Allow only JPG and PNG
const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    console.log("Wrong format!");
    callback(null, true);
  }
};

const storage = memoryStorage();
const upload = multer({ storage, limits: sizeLimits, fileFilter });

// POST single file object to s3
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const path = await uploadFileToS3(
      req.file,
      req.body.bucket,
      req.userId,
    );
    return res.send({ path: path });
  } catch (err) {
    res.status(403).json({
      error: `${err}`,
    });
  }
});


// DELETE single file object from s3 (based on key)
router.delete("/:id", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    await deleteFileFromS3(req.body.key, req.body.bucket);
    res.status(204).json({});
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

export { router };
