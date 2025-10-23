import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

// Create user
router.post('/', userController.createUser.bind(userController));

// Get user
router.get('/:userId', userController.getUser.bind(userController));

// Add RSS feed
router.post('/rss-feed', userController.addRssFeed.bind(userController));

// Add podcast feed
router.post('/podcast-feed', userController.addPodcastFeed.bind(userController));

// Save Google OAuth credentials
router.post('/google-credentials', userController.saveGoogleCredentials.bind(userController));

export default router;
