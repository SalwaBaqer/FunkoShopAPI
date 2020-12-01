const express = require("express");
const router = express.Router();

const {
  funkoShopList,
  funkoShopCreate,
} = require("../controllers/funkoShopController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()} ${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

//List
router.get("/", funkoShopList);

//create
router.post("/", upload.single("image"), funkoShopCreate);

module.exports = router;
