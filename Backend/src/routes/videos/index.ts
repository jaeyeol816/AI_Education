import express from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { getListsRouter } from './get_lists';
import { postUploadRouter } from './post_upload';
import { getDownloadRouter } from './get_download';

const router = express.Router();

router.post('/upload', verifyToken, postUploadRouter);
router.post('/lists', getListsRouter);
router.get('/download', getDownloadRouter);

export default router;