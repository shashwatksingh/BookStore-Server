const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Orders', orderSchema);
