const { promisify } = require("util");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(user._id);

  res.status(201).json({
    status: "sucess",
    token,
    data: user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("email and password is requried", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.correctPassword(password, user.password)) {
    return next(new AppError("invalid email or password", 401));
  }

  const token = signToken(user._id);

  res.status(201).json({
    status: "sucess",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.Authorization &&
    req.headers.Authorization.startswith("Bearer")
  ) {
    token = req.headers.Authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("you are not logged in", 401));
  }

  const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("user no longer exit"));
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("paaword recently changed pls login", 401));
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("permisssin denied", 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("user does not exit", 404));
  }

  const resetToken = user.correctPasswordResetToken();
  await user.save({ validateBeforeSave: false });
});
