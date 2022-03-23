const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const environment = require('../config/environment');

exports.signup = async (req, res) => {
  //#swagger.tags = ['Users']
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

    res.status(200).send({ message: 'User created', token: token });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

exports.login = async (req, res) => {
  //#swagger.tags = ['Users']
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

    res.status(200).send({ token: token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.update = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).sendo('User not found.');
    const { name, email } = req.body;

    const updateUser = await User.findByIdAndUpdate(req.params.userId, {
      name: name,
      email: email,
    });

    res.status(201).send(updateUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.delete = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).sendo('User not found.');

    const deleteUser = await User.findByIdAndDelete(req.params.userId);

    res.status(201).send(deleteUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
