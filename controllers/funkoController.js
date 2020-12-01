const { Funko } = require("../db/models");

exports.fetchFunko = async (funkoId, next) => {
  try {
    const foundFunko = await Funko.findByPk(funkoId);
    return foundFunko;
  } catch (error) {
    next(error);
  }
};

//View List
exports.funkoList = async (req, res, next) => {
  try {
    const funkos = await Funko.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log("funkos", funkos);
    res.json(funkos);
  } catch (error) {
    next(error);
  }
};

//Add new Funko
exports.funkoCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newFunko = await Funko.create(req.body);
    res.status(201).json(newFunko);
  } catch (error) {
    next(error);
  }
};

//Delete a funko
exports.funkoDelete = async (req, res, next) => {
  try {
    await req.funko.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

//Update a Funko
exports.funkoUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      await req.funko.update(req.file.filename);
    }
    await req.funko.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
