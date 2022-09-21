import express from 'express';
import morgan from 'morgan';
import { DataSource } from 'typeorm';
import passport from 'passport';
import passportConfig from './passport';

import { User } from './entities/User';
import { Course } from './entities/Course';


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
			entities: [User, Course],
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

	app.get('/', (req, res) => {
		res.json({ signal: 'success~' });
	});

	app.listen(app.get('port'), () => {
		console.log('server waiting on port no.', app.get('port'));
	});

}

main();