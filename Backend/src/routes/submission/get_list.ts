import { RequestHandler } from "express";

import { Assignment } from "../../entities/Assignment";
import { User } from '../../entities/User';
import { Submission } from "../../entities/Submisssion";
import { Course } from "../../entities/Course";

export const getListRouter: RequestHandler = async (req, res, next) => {
	try {
		//1. 사용자, 수업, 과제 정보 가져오기

		//2. 사용자가 유효한지 확인 (교강사 또는 TA인지)
		const userId = +((req as any).decoded.id);
		

		//3. assignment가 유효한지 확인

		//4. 처리.
	}
	catch (err) {
		
	}
}