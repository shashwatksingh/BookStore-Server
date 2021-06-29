const Order = require('../../models/orders');
const Users = require('../../models/users');
module.exports.confirmOrder = async (req, res) => {
  try {
    const { idBook } = req.params;
    const { phoneNumber, address, pinCode, state, userId } = req.body;
    if (!req.userId)
      res.status(400).json({ success: false, message: 'Unauthenticated User' });
    const order = await Order.createOne({
      phoneNumber,
      address,
      pinCode,
      state,
      idBook,
    });
    const user = await Users.findById(userId);
  } catch (error) {
      res.status(500).json({success: false, message: "Something went wron on our side"});
  }


};
