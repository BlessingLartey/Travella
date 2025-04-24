// routes/orderRoutes.js
import express from 'express';
import { isAuthenticated, isAuthorized } from '../middlewares/auth.js';
import { createOrder, getAllOrders, getOrderById, getUserOrders, updateOrderStatus } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/orders', isAuthenticated, createOrder);
orderRouter.get('/orders', isAuthenticated, isAuthorized(['manager']), getAllOrders);
orderRouter.get('/my-orders', isAuthenticated, getUserOrders);
orderRouter.get('/orders/:id', isAuthenticated, getOrderById);
orderRouter.patch('/orders/:id/status', isAuthenticated, isAuthorized(['manager']), updateOrderStatus);





export default orderRouter;
