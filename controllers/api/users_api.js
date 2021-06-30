const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/users');
module.exports.signin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser)
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exists" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        name: existingUser.name,
      },
      'robustbookstore',
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
module.exports.signup = async (req, res) => {
  try {
    const { email, password, confirmPassword, name } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ success: false, message: 'Passwords do not match!' });

    bcrypt.hash(password, 12, async (err, hashedPassword) => {
      let result = await User.create({
        email,
        password: hashedPassword,
        name,
      });
      const token = jwt.sign(
        {
          email: result.email,
          id: result._id,
          name: result.name,
        },
        'robustbookstore',
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
