import express from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { postSigninRouter } from './post_signin';
import { postSignupRouter } from './post_signup';

const router = express.Router();

router.post('/signin', postSigninRouter);
router.post('/signup', postSignupRouter);

export default router;
