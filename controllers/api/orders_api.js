const Order = require('../../models/orders');
const Users = require('../../models/users');
const mongoose = require('mongoose');
const Orders = require('../../models/orders');
//To confirm the order of the User
module.exports.confirmOrder = async (req, res) => {
  try {
    const { id: idBook } = req.params;
    const { phoneNumber, address, pinCode, state } = req.body;
    const userId = req.userId;
    if (!req.userId)
      return res.status(400).json({ success: false, message: 'Unauthenticated User' });
    //Has the order been created before by the same user
    let isOrderCreated = await Orders.findOne({ book: idBook, user: userId });
    isOrderCreated = isOrderCreated === null ? false : true;
    if (!isOrderCreated) {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        phoneNumber,
        address,
        pinCode,
        state,
        book: idBook,
        user: userId,
      });
      let newOrder = await order.save();
      await Users.findOneAndUpdate(
        { _id: userId },
        { $push: { orders: newOrder._id } }
      );
      let updatedUser = await Users.findById(userId);
      //Returning the updated user and the order document created by the user
      return res.status(200).json({
        message: 'Order Created',
        success: true,
        results: {
          updatedUser,
          newOrder,
        },
      });
    } else {
      return res.status(200).json({
        success: false,
        message: 'Order has been already created',
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Something went wrong on our side' });
  }
};
