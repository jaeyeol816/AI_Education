import { S3Client } from '@aws-sdk/client-s3';

export const s3Config = new S3Client({
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.S3_SECRET_KEY as string,
	},
});