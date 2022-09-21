import passport from "passport";
import * as passportJwt from 'passport-jwt';

import { User } from "../entities/User";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;


//JWT Strategy (사용자가 보내준 JWT토큰을 이용한 로그인 전략)
export default () => {
	passport.use(new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
	}, async (jwtPayload, done) => {
		try {
			const exUser = await User.findOne({ where: { id: jwtPayload.id }});
			if (exUser) 
				done(null, exUser as User);
			else 
				done(null, false, { message: "incorrect id data in jwt token"});
		}
		catch (err) {
			console.error(err);
		}
	}));
}