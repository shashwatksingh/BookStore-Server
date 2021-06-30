const Order = require('../../models/orders');
const Users = require('../../models/users');
const mongoose = require('mongoose');
const Books = require('../../models/books');
module.exports.confirmOrder = async (req, res) => {
  try {
    const { id: idBook } = req.params;
    console.log('req.userId', req.userId);
    const { phoneNumber, address, pinCode, state } = req.body;
    const userId = req.userId;
    console.log(idBook, phoneNumber, address, pinCode, state, userId);
    if (!req.userId)
      res.status(400).json({ success: false, message: 'Unauthenticated User' });
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      phoneNumber,
      address,
      pinCode,
      state,
      book: idBook,
    });
    order.save(async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const book = await Books.findById(idBook);
        const temp = await Users.findByIdAndUpdate(
          userId,
          { orders: [] },
          (err, result) => {
            console.log(result);
            if (err)
              res
                .status(404)
                .json({ message: 'User not found', success: false });
            res.status(200).json({
              orderdetails: {order: {phoneNumber, address, pinCode, state, book, user}, book,  }
            })
          }
        );
        console.log('temp', temp);
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Something went wrong on our side' });
  }
};
