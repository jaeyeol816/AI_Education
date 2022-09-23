// import { RequestHandler } from "express";
// import { spawn } from 'child_process';

// import { User } from '../../entities/User';
// import { Group } from "../../entities/Group";
// import { Course } from "../../entities/Course";

// let runPython = new Promise((success, nonsuccess) => {
// 	const process = spawn('python', ['../../../python/test.py']);

// });

// //교강사가 자신의 course에 대해 거기 속한 학생들의 그룹을 편성한다. (python호출. clustering 이용)
// export const postMakeGroupRouter: RequestHandler = async (req, res, next) => {
// 	try {
// 		const courseId = +(req.body.course_id as string);
// 		const userId = +((req as any).decoded.id);
// 		//course의 소유권이 user에게 있는지 확인
// 		if (!courseId || !userId) {
// 			return res.status(404).json({
// 				status: 404,
// 				message: "invalid request"
// 			});
// 		}
// 		let user = await User.findOne({ where: { id: userId }});
// 		let course = await Course.findOne({
// 			where: { id: courseId },
// 			relations: { registered_users: true },
// 		});
// 		if (!user || !course) {
// 			return res.status(406).json({
// 				status: 406,
// 				message: "user / course not found",
// 			});
// 		}
// 		if (course.owned_user.id != user.id) {
// 			return res.status(405).json({
// 				status: 405,
// 				message: "not a owner of the course",
// 			});
// 		}
		

// 	}
// 	catch (err) {
// 		console.error(err);
// 		return res.status(408).json({
// 			status: 408,
// 			message: "server error"
// 		})
// 	}
// }