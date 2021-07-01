const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/users');
const env = require('../../config/environment');
const jwtsecret = env.development.jwtsecretkey;
//For signing in the user
module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser)
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exists" });
    //Using bcrypt function as the passwords have been stored in the database using hashing
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    //Generating token for the user to create his/her session
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        name: existingUser.name,
      },
      jwtsecret,
      { expiresIn: '30d' }
    );

    return res.status(200).json({ success: true, result: existingUser, token });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on our side',
    });
  }
};
//For Signing Up the user 
module.exports.signup = async (req, res) => {
  try {
    const { email, password, confirmPassword, name } = req.body;
    //Checking if the user already exists as the email field is the unique property in the database
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ success: false, message: 'Passwords do not match!' });
    //Hashing the password for encryption using Bcrypt
    bcrypt.hash(password, 12, async (err, hashedPassword) => {
      let result = await User.create({
        email,
        password: hashedPassword,
        name,
      });
      //Generating token for the user
      const token = jwt.sign(
        {
          email: result.email,
          id: result._id,
          name: result.name,
        },
        jwtsecret,
        { expiresIn: '30d' }
      );
      return res.status(200).json({ success: true, result, token });
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on our side',
    });
  }
};
