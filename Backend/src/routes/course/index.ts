import express from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { postCreateRouter } from './post_create';
import { postJoinRouter } from './post_join';
import { postTaJoinRouter } from './post_ta_join';

const router = express.Router();

router.post('/create', verifyToken, postCreateRouter);
router.post('/join', verifyToken, postJoinRouter);
router.post('/tajoin', verifyToken, postTaJoinRouter);

export default router;
