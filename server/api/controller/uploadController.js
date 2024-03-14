import multer, { memoryStorage } from "multer";
import { Router } from "express";
import { uploadFileToS3 } from "../../lib/uploadFileToS3.js";
const router = Router();

// const { resizeImageFromUrl } from "../../lib/processImageSharp");
// const uploadFileFromBufferToS3 from "../../lib/uploadFileFromBufferToS3");

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
  if (!req.isAuth) {
    throw new Error("Unauthorized!");
  }
  const key = await uploadFileToS3(
    req.file,
    req.body.bucket,
    req.userId,
  );
  return res.send({ key: key });
});


// DELETE single file object from s3 (based on key)
router.delete("/:id", async (req, res) => {

});

export { router };

/*
// DELETE single file object from s3 (based on key)
router.delete("/:id", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: req.params.id,
    };
    const paramsThumb = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: "t_" + req.params.id,
    };
    const paramsMedium = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: "m_" + req.params.id,
    };
    await Promise.all([
      // eslint-disable-next-line n/handle-callback-err
      s3.deleteObject(params, function (err, data) {}),
      // eslint-disable-next-line n/handle-callback-err
      s3.deleteObject(paramsThumb, function (err, data) {}),
      // eslint-disable-next-line n/handle-callback-err
      s3.deleteObject(paramsMedium, function (err, data) {}),
    ]);
    res.status(204).json({});
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

module.exports = router;
*/
