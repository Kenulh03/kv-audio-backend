import express from 'express';
import { approveOrRejectOrder, countPendingOrders, createOrder, getOrders, getQuote } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/",createOrder)
orderRouter.post("/quote", getQuote)
orderRouter.get("/",getOrders)
 orderRouter.put("/status/:orderId",approveOrRejectOrder)
 orderRouter.post("/count",countPendingOrders)
export default orderRouter;