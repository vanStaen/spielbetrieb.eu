import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";

import { resizeImageFromBuffer } from '../processImageSharp.js';

const THUMB_SIZE_IN_PX = 180;
const MEDIUM_SIZE_IN_PX = 800;

const s3 = new S3Client({
    region: 'eu-central-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
    }
});

export const uploadFileToS3 = (async (file, bucket, userId) => {

    const key = uuid();
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

    const fileMedium = await resizeImageFromBuffer(file.buffer, THUMB_SIZE_IN_PX);
    const fileThumb = await resizeImageFromBuffer(file.buffer, MEDIUM_SIZE_IN_PX);

    const putObjectOriginal = new PutObjectCommand({
        Bucket: s3BucketId,
        Key: path,
        Body: file.buffer,
        ContentType: file.mimetype,
    })

    const putObjectMedium = new PutObjectCommand({
        Bucket: s3BucketId,
        Key: `${path}_m`,
        Body: fileMedium,
        ContentType: 'image/png',
    })

    const putObjectThumb = new PutObjectCommand({
        Bucket: s3BucketId,
        Key: `${path}_t`,
        Body: fileThumb,
        ContentType: 'image/png',
    })

    try {
        await s3.send(putObjectOriginal)
        await s3.send(putObjectMedium)
        await s3.send(putObjectThumb)
        return path;
    } catch (e) {
        console.error(e)
        return { error: e }
    }
})