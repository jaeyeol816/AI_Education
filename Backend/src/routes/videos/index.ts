import express from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { postUploadRouter } from './post_upload';

const router = express.Router();

router.post('/upload', verifyToken, postUploadRouter);

export default router;