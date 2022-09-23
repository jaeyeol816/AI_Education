import { RequestHandler } from "express";

import { Course } from "../../entities/Course";
import { User } from "../../entities/User";

export const getListRouter: RequestHandler = async (req, res, next) => {
	try {
		const userId = +((req as any).decoded.id);
		console.log(userId);
		if (!userId) {
			return res.status(406).json({
				status: 406,
				message: "user id not available",
			});
		}
		const courses = await Course.find({
			where: { registered_users: { id: userId }},
		});
		return res.status(200).json({
			status: 200,
			courses: courses,
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