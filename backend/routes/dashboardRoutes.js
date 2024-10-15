import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import {getTicketSalesData} from '../controllers/dashboardController.js'

const router = express.Router();

router.get('/ticket-sales', getTicketSalesData);

export default router;
