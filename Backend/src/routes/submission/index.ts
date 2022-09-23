import express from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { postSubmitRouter } from './post_submit';
import { getListRouter } from './get_list';

const router = express.Router();

router.post('/submit', verifyToken, postSubmitRouter);
router.post('/list', verifyToken, getListRouter);

export default router;