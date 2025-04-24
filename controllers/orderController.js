import { OrderModel } from "../models/orderModel.js";

export const createOrder = async (req, res, next) => {
    try {
      const { property, date, address } = req.body;
  
      const order = await OrderModel.create({
        property,
        user: req.auth.id, //using isAuthenticated middleware
        date,
        address
      });
  
      res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error creating order', error: err.message });
        ;
    }
  };


  export const getAllOrders = async (req, res, next) => {
    try {
      const orders = await OrderModel.find()
        .populate('product') // get product details
        .populate('user')    // get user details
        .sort({ createdAt: -1 }); // latest first
  
      res.json(orders);
    } catch (err) {
      next(err);
    }
  };

  export const getUserOrders = async (req, res, next) => {
    try {
      const orders = await OrderModel.find({ user: req.auth.id })
        .populate('product')
        .sort({ createdAt: -1 });
  
      res.json(orders);
    } catch (err) {
      next(err);
    }
  };
  
  export const getOrderById = async (req, res, next) => {
    try {
      const order = await OrderModel.findById(req.params.id)
        .populate('product')
        .populate('user');
  
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      res.json(order);
    } catch (err) {
      next(err);
    }
  };
  
  export const updateOrderStatus = async (req, res, next) => {
    try {
      const { status } = req.body;
  
      const order = await OrderModel.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      ).populate('product').populate('user');
  
      res.json(order);
    } catch (err) {
      next(err);
    }
  };
  
  
  