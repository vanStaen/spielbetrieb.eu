import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  },
});

export const getUrlFromS3 = async (path, bucket) => {
  let s3BucketId;
  if (bucket === "test") {
    s3BucketId = process.env.S3_BUCKET_TEST;
  } else if (bucket === "events") {
    s3BucketId = process.env.S3_BUCKET_EVENTS;
  } else if (bucket === "users") {
    s3BucketId = process.env.S3_BUCKET_USERS;
  } else {
    throw new Error("Bucket is missing/incorrect");
  }

  try {
    const command = new GetObjectCommand({ Bucket: s3BucketId, Key: path })
    const url = await getSignedUrl(s3, command, { expiresIn: 900 })
    return url;
  } catch (e) {
    console.error(e);
    return { e };
  }
};
