import express from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { getMyGroupRouter } from './get_mygroup';
import { getListRouter } from './get_list';
// import { postMakeGroupRouter } from './post_makegroup';
import { getTempRouter } from './get_temp';

const router = express.Router();

router.get('/mygroup', verifyToken, getMyGroupRouter);
router.get('/list', getListRouter);
// router.post('/makegroup', verifyToken, postMakeGroupRouter);
router.get('/temp', getTempRouter);

export default router;