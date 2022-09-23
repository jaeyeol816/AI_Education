import express from 'express';
import morgan from 'morgan';
import { DataSource } from 'typeorm';
import passport from 'passport';
import passportConfig from './passport';
import AWS from 'aws-sdk';

import { User } from './entities/User';
import { Course } from './entities/Course';
import { Group } from './entities/Group';
import { Video } from './entities/Video';
import { Assignment } from './entities/Assignment';
import { Submission } from './entities/Submisssion';
import authRouter from './routes/auth';
import courseRouter from './routes/course';
import videoRouter from './routes/videos';
import groupRouter from './routes/group';
import assignmentRouter from './routes/assignment';
import submissonRouter from './routes/submission';

const app = express();

app.set('port', process.env.PORT || 80);

const main = async () => {
	try {
		const appDataSource = new DataSource({
			type: "mysql",
			host: process.env.DB_URL,
			port: 3306,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [User, Course, Group, Video, Submission, Assignment],
			synchronize: true,
			charset: 'UTF8_GENERAL_CI',
		});
		await appDataSource.initialize();
		console.log('database connected!!');
	}
	catch (err) {
		console.log('db connection failed!!');
		console.error(err);
	}

	app.use(morgan(process.env.NODE_ENV || 'dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(passport.initialize());
	passportConfig();

	AWS.config.update({
		accessKeyId: process.env.S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.S3_SECRET_KEY,
		region: process.env.S3_REGION
	});

	app.use('/auth', authRouter);
	app.use('/course', courseRouter);
	app.use('/video', videoRouter);
	app.use('/group', groupRouter);
	app.use('/assignment', assignmentRouter);
	app.use('/submission', submissonRouter);

	app.get('/', (req, res) => {
		res.json({ signal: 'success~' });
	});

	app.listen(app.get('port'), () => {
		console.log('server waiting on port no.', app.get('port'));
	});

}

main();