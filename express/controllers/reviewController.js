const Reviews = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Reviews.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const reviews = await features.query;

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Reviews.findById(req.params.id);
  if (!review) {
    return next(new AppError("review not found", 400));
  }

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.tour = req.user.id;

  const newReview = await Reviews.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newReview,
    },
  });
});
