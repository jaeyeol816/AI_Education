import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import { RequestHandler } from 'express';

import { s3Config } from '../../s3config';
import { Course } from '../../entities/Course';
import { User } from '../../entities/User';
import { Video } from '../../entities/Video';


const upload = multer({
	fileFilter: function(_req, file, cb) {
		const fileType = /mp4|avi|mov|wmv/;
		const extName = fileType.test(path.extname(file.originalname).toLocaleLowerCase());
		const mimeType = fileType.test(file.mimetype);
		if (extName && mimeType) 
			return cb(null, true);
		else
			cb(new Error('not valid file type'));
	},
	storage: multerS3({
		s3: s3Config,
		bucket: process.env.S3_BUCKET_NAME as string,
		metadata: function(req, file, cb) {
			cb(null, {
				fieldname: file.fieldname,
			});
		}, 
		key: function(req, file, cb) {
			cb(null, `videos/${Date.now()}${path.basename(file.originalname)}`);
		},
	}),
});

export const postUploadRouter: RequestHandler = async (req, res, next) => {
	try {
		//아래. Keep in mind that ‘video’ is the field name which we will also set in front end. Both should be the same.
		upload.single('video')(req, res, async (err) => {
			if (err) {
				console.error(err);
				return res.status(408).json({
					status: 408,
					message: "error while uploading (multer-s3)"
				});
			}
		});
		//upload는 완료. 데이터베이스 테이블에 주소정보 저장해야함.
		//http요청의 params으로부터 course id를 얻어오고, header의 토큰으로부터 user id를 얻어옴.
		const courseIdStr = req.query.course_id as string;
		const courseId = parseInt(courseIdStr);
		const userId = +((req as any).decoded.id);
		//course가 있는가? 그리고 user가 course의 소유자가 맞는가?
		let user = await User.findOne({ where: { id: userId } });
		let course = await Course.findOne({ 
			where: { id: courseId },
			relations: { owned_user: true },
		});
		if (!course || !user) {
			return res.status(406).json({
				status: 406,
				message: "course or user not found",
			});
		}
		if (course.owned_user.id != user.id) {
			return res.status(405).json({
				status: 405,
				message: "not a owner of the course"
			});
		}
		//videos 테이블에 저장.
		let video = new Video();
		const videoName = req.query.video_name as string;
		console.log(req.file);		//test code
		console.log(req.files);		//test code
		const key = (req.file as any).key as string;
		video.name = videoName;
		video.url = key;
		video.course = course;
		await video.save();
		await course.save();
		return res.status(200).json({
			status: 200,
			message: "video storing successed"
		})
	}
	catch (err) {
		console.error(err);
		return res.status(408).json({
			status: 408,
			message: "server error",
		});
	}
}