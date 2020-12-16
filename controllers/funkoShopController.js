const { FunkoShop, Funko } = require("../db/models");

var request = require("request");
var fs = require("fs");

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
      request.post(
        {
          url: "https://api.remove.bg/v1.0/removebg",
          formData: {
            image_file: fs.createReadStream(`./media/${req.file.filename}`),

            size: "auto",
          },
          headers: {
            "X-Api-Key": "rtdFpg96ycmnPWNaqFekfCGx",
          },
          encoding: null,
        },
        function (error, response, body) {
          if (error) return console.error("Request failed:", error);
          if (response.statusCode != 200)
            return console.error(
              "Error:",
              response.statusCode,
              body.toString("utf8")
            );
          fs.writeFileSync(`./media/${req.file.filename}no-bg.png`, body);
          console.log(response.body);
        }
      );
    }
    req.body.image = `http://${req.get("host")}/media/${
      req.file.filename
    }no-bg.png`;
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
