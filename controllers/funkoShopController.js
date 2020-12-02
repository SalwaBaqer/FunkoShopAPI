const { FunkoShop, Funko } = require("../db/models");

//View ListShop
exports.funkoShopList = async (req, res, next) => {
  try {
    const funkosShop = await FunkoShop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Funko,
          as: "funkos",
          attributes: ["id"],
        },
      ],
    });

    res.json(funkosShop);
  } catch (error) {
    next(error);
  }
};

//Add new FunkoShop
exports.funkoShopCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    const newFunkoShop = await FunkoShop.create(req.body);
    res.status(201).json(newFunkoShop);
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

    req.body.funkoShopId = req.params.shopsId;
    const newFunko = await Funko.create(req.body);
    res.status(201).json(newFunko);
  } catch (error) {
    next(error);
  }
};
