import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // chek empty fields
  if (!name || !email || !password) {
    throw new BadRequestError('please provide all values');
  }

  // exists
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }

  // create new one
  const user = await User.create({ name, email, password });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Guard
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }

  // Find user in DB
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  const { name, lastName, email, location } = req.body;

  if (!name || !lastName || !email || !location) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ _id: req.user.userId });
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;

  await user.save();
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

export { register, login, updateUser };
