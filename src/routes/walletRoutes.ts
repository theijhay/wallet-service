import { Router } from 'express';
import { fundWallet, transferFunds, withdrawFunds } from '../controllers/walletController';
import { asyncHandler } from '../utils/asyncHandler';
import { authMiddleware } from '../services/ authService';

const router = Router();

router.post('/fund', authMiddleware, asyncHandler(fundWallet));
router.post('/transfer', authMiddleware, asyncHandler(transferFunds));
router.post('/withdraw', authMiddleware, asyncHandler(withdrawFunds));

export default router;
