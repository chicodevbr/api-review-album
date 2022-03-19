const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const environment = require('../config/environment');

exports.signup = async (req, res) => {
  try {
    let user = User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send('User with that email already exist.');

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      reviews: { posts: [] },
    });

    await user.save();

    const secretKey = environment.jwtAccessTokenSecret;

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      secretKey
    );

    res.send(token);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};
