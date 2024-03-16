import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";

const s3 = new S3Client({
    region: 'eu-central-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
    }
});

export const deleteFileFromS3 = (async (key, bucket, userId) => {

    const path = `${userId}/${key}`;

    let s3BucketId;
    if (bucket === 'test') {
        s3BucketId = process.env.S3_BUCKET_TEST;
    } else if (bucket === 'events') {
        s3BucketId = process.env.S3_BUCKET_EVENTS;
    } else if (bucket === 'users') {
        s3BucketId = process.env.S3_BUCKET_USERS;
    } else {
        return { error: "Bucket is missing/incorrect" }
    }

    const deleteObjectCommandOriginal = new DeleteObjectCommand({
        Bucket: s3BucketId,
        Key: path,
    })

    const deleteObjectCommandMedium = new DeleteObjectCommand({
        Bucket: s3BucketId,
        Key: `${path}_m`,
    })

    const deleteObjectCommandThumb = new DeleteObjectCommand({
        Bucket: s3BucketId,
        Key: `${path}_t`,
    })

    try {
        await s3.send(deleteObjectCommandOriginal)
        await s3.send(deleteObjectCommandMedium)
        await s3.send(deleteObjectCommandThumb)
        return true;
    } catch (e) {
        console.error(e)
        return { error: e }
    }
})