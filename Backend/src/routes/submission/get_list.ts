import { RequestHandler } from "express";

import { Assignment } from "../../entities/Assignment";
import { User } from '../../entities/User';
import { Submission } from "../../entities/Submisssion";
import { Course } from "../../entities/Course";

export const getListRouter: RequestHandler = async (req, res, next) => {
	try {
		//1. 사용자, 수업, 과제 정보 가져오기
		const userId = +((req as any).decoded.id);
		const assignmentName = req.body.assignment_name;
		if (!userId || !assignmentName) {
			return res.status(406).json({
				status: 406,
				message: "information not in the request body"
			})
		}
		const user = await User.findOne({ where: { id: userId } });
		const assignment = await Assignment.findOne({ where: { name: assignmentName } });
		const course = await Course.findOne({ 
			where: { assignments: { name: assignmentName } },
			relations: { owned_user: true, ta_ing_users: true }, 
		});
		if (!user || !assignment || !course) {
			return res.status(407).json({
				status: 407,
				message: "not found user / assignment / course ㅠㅠ"
			});
		}

		//2. 사용자가 교강사 또는 TA인지 확인. 
		//   if (교강사 아님 AND ta가 아님)
		if (!(course.owned_user.id == user.id) && course.ta_ing_users.indexOf(user) != -1) {
			return res.status(405).json({
				status: 405,
				message: "do not have previlege"
			});
		}
		
		//3. 처리.
		const submissions = await Submission.find({
			where: { assignment: { id: assignment.id } },
		});
		return res.status(200).json({
			status: 200,
			submissions: submissions,
		})
	}
	catch (err) {
		console.error(err);
		res.status(408).json({
			status: 408,
			message: "server error",
		})
	}
}