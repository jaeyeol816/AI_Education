import express, { RequestHandler} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export const postSigninRouter: RequestHandler = (req, res, next) => {
	passport.authenticate('local', { session: false }, (authError, user, info) => {
		if (authError) {
			console.error(authError);
			return next(authError);
		}
		if (!user) {
			return res.status(405).json({
				code: 405, 
				message: 'login failed',
			});
		}
		else {	//로그인 전략 성공시 JWT 토큰 발급
			const token = jwt.sign({
				id: user.id,
				name: user.name,
				email: user.email,
			}, process.env.JWT_SECRET as string, {
				expiresIn: '365d',
				issuer: 'ai-education',
			});
			return res.status(200).json({
				code: 200,
				token,
			});
		}
	})(req, res, next);
}