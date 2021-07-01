const jwt = require('jsonwebtoken');
const Orders = require('../models/orders');
const env = require('../config/environment');
const jwtsecret = env.development.jwtsecretkey;

//middleware to authenticate the private requests such as ordering etc

const auth = async (req, res, next) => {
  console.log('Inside auth', req.body);
  try {
    const token = req.headers.authorization.split(' ')[1];
    let decodeData;

    if (token) {
      decodeData = jwt.verify(token, jwtsecret);
      console.log('id',decodeData?.id)

      req.userId = decodeData?.id;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
