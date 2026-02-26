import express from 'express';
import { login,register,refreshTokenHandler,logout } from '../controllers/authController.js';
import { validateSchema } from '../middleware/validateMiddleware.js';
import {loginValidation,registerValidation} from '../validation/authValidation.js'
import { loginRateLimiter } from '../middleware/loginRateLimiter.js';

const router= express.Router()

router.post('/register',validateSchema(registerValidation),register)
router.post('/login',loginRateLimiter,validateSchema(loginValidation),login)
router.post('/refresh-token',refreshTokenHandler)
router.post('/logout',logout)

export default router;