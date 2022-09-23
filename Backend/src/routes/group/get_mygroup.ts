import { RequestHandler } from "express";

import { User } from "../../entities/User";
import { Group } from "../../entities/Group";

//특정 학생이 어떤 그룹에 속했는지, 그리고 그룹원이 누구인지 반환하는 역할
export const getMyGroupRouter: RequestHandler = async (req, res, next) => {
	try {
		const userId = +(req.query.user_id as string);
		//User테이블에서 사용자를 찾고 그것으로부터 사용자의 그룹들을 얻어온다.
		const user = await User.findOne({
			where: { id: userId },
			relations: { group: true },
		});
		if (!user) {
			return res.status(406).json({
				status: 406,
				message: "user not found",
			});
		}
		const group = await Group.findOne({
			where: { id: user.group.id },
			select: { users: true },
		});
		if (!group) {
			return res.status(407).json({
				status: 407,
				message: "group not found"
			});
		}
		return res.status(200).json({
			status: 200,
			group: group,
		});
	}
	catch (err) {
		console.error(err);
		return res.status(408).json({
			status: 408,
			message: 'server error',
		})
	}
}