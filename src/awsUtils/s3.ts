/* eslint-disable import/no-extraneous-dependencies */
import { S3 } from 'aws-sdk';
import mime from 'mime';
import path from 'path';

export const createObject = async (
  key: string,
  data: string | Buffer,
  contentType?: string,
): Promise<S3.ManagedUpload.SendData | undefined> => {
  const bucketName = process.env.BUCKET || 'it definitely exists';
  const s3 = new S3();

  const fileExtension = path.extname(key);
  const calculatedContentType = mime.getType(fileExtension);

  const bodyData = data;
  const s3params: S3.PutObjectRequest = {
    Body: bodyData,
    Bucket: bucketName,
    Key: key,
    ContentType: contentType || calculatedContentType || 'text/plain',
    ACL: 'public-read',
  };

  return s3.upload(s3params).promise();
};
