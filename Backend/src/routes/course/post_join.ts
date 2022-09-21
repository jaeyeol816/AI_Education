import { RequestHandler } from "express";

import { User } from "../../entities/User";
import { Course } from "../../entities/Course";	

export const postJoinRouter: RequestHandler = async (req, res, next) => {
	try {
		const userId = (req as any).decoded.id;
		const findedUser = await User.findOne({ where: { id: userId } });
		const courseCode = req.body.course_code as string;
		let findedCourse = await Course.findOne({ where: { code: courseCode } });
		if (findedCourse && findedUser) {
			findedCourse.registered_users.push(findedUser);
			await findedCourse.save();
			return res.status(200).json({
				status: 200,
				message: "joined to the course"
			});
		}
		else {
			return res.status(406).json({
				status: 406,
				message: "course not found from the code.",
			});
		}
	}
	catch (err) {
		console.error(err);
		return res.status(408).json({
			status: 408,
			message: "server error",
		});
	}
}