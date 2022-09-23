import { RequestHandler } from "express";

import { User } from "../../entities/User";
import { Course } from "../../entities/Course";
import { Assignment } from "../../entities/Assignment";

export const postMakeRouter: RequestHandler = async (req, res, next) => {
	try {
		//일단 사람, 강좌 아이디를 얻은 후 해당 사람이 해당 강좌의 주인이 맞는지 확인
		const userId = +((req as any).decoded.id);
		const courseName = req.body.course_name as string;
		if (!userId || !courseName) {
			return res.status(406).json({
				status: 405,
				message: "user / course id not available",
			});
		}
		let user = await User.findOne({ where: { id: userId } });
		let course = await Course.findOne({ 
			where: { name: courseName },
			relations: { owned_user: true },
		});
		if (!user || !course) {
			return res.status(406).json({
				status: 406,
				message: "user / course not found",
			});
		}
		if (course.owned_user.id != user.id) {
			return res.status(406).json({
				status: 405,
				message: "ont a owner of the course",
			});
		}

		//Assignmet 테이블에 저장
		let assignment = new Assignment();
		assignment.name = req.body.name;
		assignment.text = req.body.text;
		assignment.course = course;
		await assignment.save();
		await course.save();

		//응답
		return res.status(200).json({
			status: 200,
			assignment: assignment,
		})
	}
	catch (err) {
		console.error(err);
		return res.status(408).json({
			status: 408,
			message: "server error"
		})
	}
}