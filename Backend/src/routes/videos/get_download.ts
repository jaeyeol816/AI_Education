import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';
import { RequestHandler } from 'express';

import { s3Config } from '../../s3config';
import { Video } from '../../entities/Video';

AWS.config.update({
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_KEY,
	region: process.env.S3_REGION,
});
const s3 = new AWS.S3();

export const getDownloadRouter: RequestHandler = async (req, res, next) => {
	try {
		const videoName = (req.query.video_name as string);
		if (!videoName) {
			return res.status(406).json({
				status: 406,
				message: "do not have video_name property on req JSON"
			});
		}
		const video = await Video.findOne({ where : { name: videoName } });
		if (!video) {
			return res.status(407).json({
				status: 407,
				message: "video not found",
			});
		}
		// await s3.getObject({
		// 	Bucket: process.env.S3_BUCKET_NAME as string,
		// 	Key: video.url
		// }, (err, data) => {
		// 	if (err) {
		// 		console.error(err);
		// 		return res.status(410).json({
		// 			message: "error while s3.getObject",
		// 		});
		// 	}
		// 	else {
		// 		res.status(200).send(data.Body);
		// 		res.end();
		// 	}
		// }).promise();
		let fileStream = s3.getObject({
			Bucket: process.env.S3_BUCKET_NAME as string,
			Key: video.url,
		}).createReadStream();
		fileStream.pipe(res);
	}
	catch (err) {
		console.error(err);
		return res.status(408).json({
			message: "server error",
			status: 408,
		})
	}
}