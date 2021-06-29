const jwt = require('jsonwebtoken');

//middleware to authenticate the private requests such as ordering etc

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    let decodeData;

    if (token) {
      decodeData = jwt.verify(token, 'robustbookstore');

      req.userId = decodedData?.id;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
