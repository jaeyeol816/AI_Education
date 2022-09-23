import { RequestHandler } from "express";

import { Course } from "../../entities/Course";
import { Group } from "../../entities/Group";

export const getListRouter: RequestHandler = async (req, res, next) => {
	try {
		const courseId = +(req.query.course_id as string);
		const course = await Course.findOne({
			where: { id: courseId },
			relations: { groups: true },
		});
		if (!course) {
			return res.status(406).json({
				status: 406,
				message: "course not found",
			});
		}
		const groups = await Group.find({
			where: { course: { id: course.id } },
			relations: { users: true },
		});
		if (!groups) {
			return res.status(407).json({
				status: 407,
				message: "group not found",
			});
		}
		return res.status(200).json({
			status: 200,
			groups: groups,
		});
	}
	catch (err) {
		console.error(err);
		return res.status(408).json({
			status: 408,
			message: "server error",
		})
	}
}