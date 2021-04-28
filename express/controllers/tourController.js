const Tours = require("../models/tourModel");
const ApiFeatures = require("../utils/apiFeatures");

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = "-ratingAverage,price";
  req.query.fields = "name,ratingAverage,summary,difficulty";
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // execution //
    const features = new ApiFeatures(Tours.find(), req.query)
      .filter()
      .sort()
      .limitsFields()
      .pagination();

    const tours = await features.query;

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tours.findById(req.parmas.id);

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tours.create(req.boby);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tours.findByIdAndUpdate(req.parmas.id, req.boby, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {}
};

exports.deleteTour = async (req, res) => {
  try {
    await Tours.findByIdAndDelete(req.parmas.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tours.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: "$difficul1ty" },
          numTours: { $sum: 1 },
          numRating: { $sum: "$ratingQunatity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          maxPrice: { $max: "$price" },
          minPrice: { $min: "$price" },
        },
      },
      { $sort: { avgPrice: 1 } },
    ]);
    res.status(204).json({
      status: "success",
      data: stats,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.parmas.year * 1;
    const stats = await Tours.aggregate([
      { $unwind: "$startDates" },
      {
        $match: {
          startDates: {
            $gte: new Date(`{year}-01-01`),
            $lte: new Date(`{year}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDate" },
          numTourStats: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      {
        $addFields: {
          month: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      { $sort: { numTourStats: -1 } },
    ]);
    res.status(204).json({
      status: "success",
      data: stats,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};
