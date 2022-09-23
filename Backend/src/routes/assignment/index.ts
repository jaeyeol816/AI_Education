import express from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { postMakeRouter } from './post_make';
import { getListRouter } from './get_list';

const router = express.Router();

router.post('/make', verifyToken, postMakeRouter);
router.post('/list', getListRouter);

export default router;