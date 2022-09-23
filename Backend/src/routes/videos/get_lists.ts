import { RequestHandler } from "express";

import { Video } from "../../entities/Video";
import { Course } from '../../entities/Course';

//특정 course의 video리스트를 반환하는 역할
export const getListsRouter: RequestHandler = async (req, res, next) => {
	try {
		const courseName = req.body.course_name;
		const course = await Course.findOne({ where: { name: courseName } });
		if (!course) {
			return res.status(406).json({
				status: 406,
				message: 'course not found',
			});
		}
		const videos = await Video.find({ 
			where: {course: { name: courseName } },
			select: { name: true }	
		});
		if (!videos) {
			return res.status(407).json({
				status: 407,
				message: "video not found",
			});
		}
		return res.status(200).json({
			status: 200,
			videos: videos,
		});
	}
	catch (err) {
		console.error(err);
		return res.status(408).json({
			status: 408,
			message: "server error"
		});
	}
}