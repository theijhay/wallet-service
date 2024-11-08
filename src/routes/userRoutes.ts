import { Router } from 'express';
import { registerUser } from '../controllers/userController'
import { asyncHandler } from '../utils/asyncHandler';
import { loginUser } from '../controllers/userController';

const router = Router();

router.post('/register', asyncHandler (registerUser));
router.post('/login', asyncHandler(loginUser));

export default router;
