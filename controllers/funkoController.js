const slugify = require("slugify");
let funkos = require("../funkos");
const { Funko } = require("../db/models");

//View List
exports.funkoList = async (req, res) => {
  try {
    const funkos = await Funko.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log("funkos", funkos);
    res.json(funkos);
  } catch (error) {
    console.error("FunkoStore -> fetchFunkos -> error", error);
  }
};

//Add new Funko
exports.funkoCreate = async (req, res) => {
  try {
    const newFunko = await Funko.create(req.body);
    res.status(201).json(newFunko);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete a funko
exports.funkoDelete = async (req, res) => {
  const { funkoId } = req.params;
  try {
    const foundFunko = await Funko.findByPk(funkoId);
    if (foundFunko) {
      await foundFunko.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Funko not found" });
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

//Update a Funko
exports.funkoUpdate = async (req, res) => {
  const { funkoId } = req.params;
  try {
    const foundFunko = await Funko.findByPk(funkoId);
    if (foundFunko) {
      await foundFunko.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Funko not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
