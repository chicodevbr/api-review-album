const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const environment = require('../config/environment');
const { validationResult } = require('express-validator');

exports.signup = async (req, res) => {
  //#swagger.tags = ['Users']
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty() && errors.errors[0].param === 'name') {
    return res.status(422).send({
      message: 'Please, fill out all fields.',
    });
  }

  if (!errors.isEmpty() && errors.errors[0].param === 'email') {
    return res.status(400).send({
      message: 'Invalid email address. Please try again.',
    });
  }

  if (!errors.isEmpty() && errors.errors[0].param === 'password') {
    return res.status(400).send({
      message: 'Password must be longer than 6 characters',
    });
  }

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
    res.status(500).json({ error: error });
  }
};

exports.login = async (req, res) => {
  //#swagger.tags = ['Users']
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).send({
      message: 'Please, fill out all fields. Try again.',
    });
  }

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
    res.status(500).json({ error: error });
  }
};

exports.getAll = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const users = await User.find();
    if (!users) return res.status(404).send('There are no users created yet');

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
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

    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.delete = async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send('User not found.');

    await User.findByIdAndDelete(req.params.userId);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
