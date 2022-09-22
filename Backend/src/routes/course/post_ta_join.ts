import { RequestHandler } from "express";

import { User } from "../../entities/User";
import { Course } from "../../entities/Course";	

export const postTaJoinRouter: RequestHandler = async (req, res, next) => {
	try {
		const userId = (req as any).decoded.id;
		const findedUser = await User.findOne({ where: { id: userId } });
		const taCode = req.body.ta_code as string;		
		const findedCourse = await Course.findOne({ where: { ta_code: taCode }});
		if (findedUser && findedCourse) {
			findedCourse.ta_ing_users.push(findedUser);
			await findedCourse.save();
			return res.status(200).json({
				status: 200,
				message: "joined TA to the course"
			});
		}
		else {
			return res.status(406).json({
				status: 406,
				message: "not available",
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