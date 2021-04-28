const Tours = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excudeFields = ["page", "sort", "limit", "fields"];
    excudeFields.forEach((el) => delete queryObj[el]);

    //advanced filtering//

    let queryStr = JSON.parse(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tours.find(JSON.parse(queryStr));

    //sorting//

    if (req.query.sort) {
      const sortby = req.query.sort.split(",").join(" ");
      query = query.sort(sortby);
    } else {
      query = query.sort("-createdAt");
    }

    const tours = await query;

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(400).send(error);
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
