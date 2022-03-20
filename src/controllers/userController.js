const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const environment = require('../config/environment');

exports.signup = async (req, res) => {
  /*
  #swagger.tags = ['Users']
  #swagger.description = 'Endpoint que cadastra um novo usuário."
  */
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).send('User with that email already exist.');
    }

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

exports.login = async (req, res) => {
  /*
  #swagger.tags = ['Users']
  #swagger.description = 'Endpoint de login na base de dados."
  */
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send('Invalid email or password');

    const secretKey = environment.jwtAccessTokenSecret;

    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      secretKey
    );

    res.send(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
