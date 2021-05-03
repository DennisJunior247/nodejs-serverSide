const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const filterObj = function(obj, ...allowfilteredObj) {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowfilteredObj.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("pls update password with updatePassword endpoint", 400)
    );
  }
  const filterReq = filterObj(req.body, "name", "email");
  const user = await User.findByIdAndUpdate(req.user.id, filterReq, {
    new: true,
  });

  res.status(200).json({
    status: "error",
    user,
  });
});

exports.deleteMe = catchAsync(async () => {
  const user = User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "error",
    user,
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
