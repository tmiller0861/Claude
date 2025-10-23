import { Router } from 'express';
import feedController from '../controllers/feedController';

const router = Router();

// Get aggregated feed
router.get('/:userId', feedController.getFeed.bind(feedController));

// Get saved items
router.get('/:userId/saved', feedController.getSavedItems.bind(feedController));

// Get unread items
router.get('/:userId/unread', feedController.getUnreadItems.bind(feedController));

// Mark as read/unread
router.post('/read', feedController.markAsRead.bind(feedController));
router.post('/unread', feedController.markAsUnread.bind(feedController));

// Save/unsave items
router.post('/save', feedController.saveItem.bind(feedController));
router.post('/unsave', feedController.unsaveItem.bind(feedController));

export default router;
