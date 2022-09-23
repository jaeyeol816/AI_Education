import express from 'express';

import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.post('/make', verifyToken, )

export default router;