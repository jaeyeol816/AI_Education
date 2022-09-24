import { RequestHandler } from "express";

import { Submission } from "../../entities/Submisssion";
import { Assignment } from "../../entities/Assignment";
import { User } from '../../entities/User';
import { Course } from '../../entities/Course';

export const postSubmitRouter: RequestHandler = async (req, res, next) => {
	try {
		const userId = +((req as any).decoded.id);
		const assignmentName = (req.body.assignment_name);
		const text = req.body.text;
		if (!userId || !assignmentName || !text) {
			return res.status(406).json({
				status: 406,
				message: "user / assignment / text not available",
			});
		}
		let user = await User.findOne({ where: { id: userId } });
		let assignment = await Assignment.findOne({ where: { name: assignmentName } });
		if (!user || !assignment) {
			return res.status(407).json({
				status: 407,
				message: "user / assignment not found",
			});
		}
		let submisson = new Submission();
		submisson.assignment = assignment;
		submisson.user = user;
		submisson.text = text;
		await submisson.save();
		await user.save();
		await assignment.save();
		return res.status(200).json({
			status: 200,
			submisson: submisson,
		});
	}
	catch (err) {
		console.error(err);
		return res.status(408).json({
			status: 408,
			message: "server error"
		})
	}
}