const jwt = require('jsonwebtoken');
const env = require('../config/environment');
const jwtsecret = env.development.jwtsecretkey;

//middleware to authenticate the private requests such as ordering etc

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    let decodeData;

    if (token) {
      decodeData = jwt.verify(token, jwtsecret);
      console.log('id',decodeData?.id)

      req.userId = decodeData?.id;
    }

  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = auth;
