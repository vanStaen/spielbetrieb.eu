import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  },
});

export const deleteFileFromS3 = async (path, bucket) => {
  let s3BucketId;
  if (bucket === "test") {
    s3BucketId = process.env.S3_BUCKET_TEST;
  } else if (bucket === "events") {
    s3BucketId = process.env.S3_BUCKET_EVENTS;
  } else if (bucket === "users") {
    s3BucketId = process.env.S3_BUCKET_USERS;
  } else if (bucket === "partners") {
    s3BucketId = process.env.S3_BUCKET_PARTNERS;
  } else if (bucket === "bugs") {
    s3BucketId = process.env.S3_BUCKET_BUGS;
  } else if (bucket === "temp") {
    s3BucketId = process.env.S3_BUCKET_TEMP;
  } else {
    throw new Error("Bucket is missing/incorrect");
  }

  try {
    const deleteObjectCommandOriginal = new DeleteObjectCommand({
      Bucket: s3BucketId,
      Key: path,
    });
    await s3.send(deleteObjectCommandOriginal);

    if (bucket !== "bugs") {
      const deleteObjectCommandMedium = new DeleteObjectCommand({
        Bucket: s3BucketId,
        Key: `${path}_m`,
      });
      const deleteObjectCommandThumb = new DeleteObjectCommand({
        Bucket: s3BucketId,
        Key: `${path}_t`,
      });
      await s3.send(deleteObjectCommandMedium);
      await s3.send(deleteObjectCommandThumb);
    }

    return true;
  } catch (e) {
    console.error(e);
    return { e };
  }
};
