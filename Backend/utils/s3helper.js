import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";
import { v4 as uuid } from "uuid";

export const uploadToS3 = async (file) => {
  const fileKey = `doctors/${uuid()}-${file.originalname}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
};