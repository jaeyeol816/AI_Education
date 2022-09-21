import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from "../../entities/User";


export const postSignupRouter: RequestHandler = async (req, res, next) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password) {
		return res.status(406).json({
			code: 406,
			message: "Invalid Input",
		});
	}
	try {
		//이미 가입된 이메일인지?
		const exUser1 = await User.findOne({ select: ['id'], where: { email } });
		if (exUser1) {
			return res.status(407).json({
				code: 407,
				message: "already registered email",
			});
		}
		const hashedPassword = await bcrypt.hash(password as string, 12);
		
		//데이터베이스에 저장
		const user = new User();
		user.email = email;
		user.name = name;
		user.password = hashedPassword;
		const resultUser = await user.save();

		//JWT토큰 만들기
		if (resultUser) {
			const token = jwt.sign(
				{
				id: resultUser.id,
				name: resultUser.name,
				email: resultUser.email,
				}, 
				process.env.JWT_SECRET as string, 
				{
					expiresIn: '365d',
					issuer: 'ai-education',
				},
			);
			return res.status(200).json({
				code: 200,
				token: token,
			});
		}
		else {
			return res.status(408).json({
				code: 408,
				message: "server issue1"
			});
		}
	}
	catch (err) {
		return res.status(408).json({
			code: 408,
			message: "server issue2"
		});
	}
}
