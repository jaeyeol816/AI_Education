import express, { RequestHandler} from 'express';

import { User } from '../../entities/User';
import { Course } from '../../entities/Course';

export const postCreateRouter: RequestHandler = async (req, res ,next) => {
	try {
		const userId = (req as any).decoded.id;
		const user = await User.findOne({where: {id: userId}});
		if (user) {
			let course = new Course();
			course.owned_user = user;
			const courseName = req.body.name;
			course.name = courseName;
			const classCode = (Math.random()+1).toString(36).substring(2, 11);
			course.code = classCode + user.id.toString();
			const taCode = (Math.random()+1).toString(36).substring(2, 11);
			course.ta_code = taCode + user.id.toString();
			await course.save();
			return res.status(200).json({
				status: 200,
				message: "course created.",
				course: course,
			});
		}
		else {
			return res.status(406).json({
				status: 406,
				message: "not registered person",
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