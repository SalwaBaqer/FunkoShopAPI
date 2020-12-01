const { FunkoShop } = require("../db/models");

//View ListShop
exports.funkoShopList = async (req, res, next) => {
  try {
    const funkosShop = await FunkoShop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log("funkosShop", funkosShop);
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
