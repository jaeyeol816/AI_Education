import express from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { getListsRouter } from './get_lists';
import { postUploadRouter } from './post_upload';

const router = express.Router();

router.post('/upload', verifyToken, postUploadRouter);
router.get('/lists', getListsRouter);

export default router;