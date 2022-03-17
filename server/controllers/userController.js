const User = require('../models/user');
const bcrypt = require('bcryptjs');

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
  } catch (error) {
    console.log(error);
  }
};
