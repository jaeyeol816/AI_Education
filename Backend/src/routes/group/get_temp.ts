import { RequestHandler } from "express";
import { spawn } from 'child_process';


// let runPython = new Promise<string>((resolve, reject) => {
// 	const process = spawn('python', ['../../../python/test.py']);
// 	process.stdout.on('data', (data) =>{
// 		resolve(data as string);
// 	});
// 	process.stderr.on('data', (data) => {
// 		reject(data);
// 	})
// });

//nodejs에서 python돌려보는 테스트 라우트
export const getTempRouter: RequestHandler = (req, res, next) => {
	try {
		const process = spawn('python', ['/app/python/test.py']);
		process.stdout.on('data', (data) =>{
			console.log(data.toString());
			res.status(200).json({
				message: "success"
			});
		});
		process.stderr.on('data', (data) => {
			console.log(data.toString());
			res.status(408).json({
				message: "error1"
			});
		});
		// runPython
		// 	.then((fromRunPython) => {
		// 		console.log(fromRunPython);
		// 		res.status(200).json({
		// 			message: "success"
		// 		});
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		res.status(408).json({
		// 			message: "error1"
		// 		});
		// 	});
	}
	catch (err) {
		console.error(err);
		return res.status(408).json({
			message: "error2"
		})
	}
}