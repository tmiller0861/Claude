import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

// Get OAuth URL
router.get('/auth-url', authController.getAuthUrl.bind(authController));

// Handle OAuth callback
router.post('/callback', authController.handleCallback.bind(authController));

// Refresh token
router.post('/refresh', authController.refreshToken.bind(authController));

export default router;
