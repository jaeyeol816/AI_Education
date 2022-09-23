import { RequestHandler } from "express";

import { Assignment } from "../../entities/Assignment";
import { Course }	from '../../entities/Course';

export const getListRouter: RequestHandler = async (req, res, next) => {
	try {
		const courseId = +(req.query.course_id as string);
		if (!courseId) {
			return res.status(406).json({
				status: 406,
				message: "course id not available",
			});
		}
		const course = await Course.findOne({ where: {id: courseId } });
		if (!course) {
			return res.status(407).json({
				status: 407,
				message: "course not found",
			});
		}
		const assignments = await Assignment.find({
			where: { course: {id: courseId }},
		});
		return res.status(200).json({
			status: 200,
			assignments: assignments,
		})
	}
	catch (err) {
		return res.status(408).json({
			status: 408,
			message: "server error",
		});
	}
}