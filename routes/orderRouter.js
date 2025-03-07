import express from 'express';
import { createOrder, getQuote } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/",createOrder)
orderRouter.post("/quote", getQuote)

export default orderRouter;