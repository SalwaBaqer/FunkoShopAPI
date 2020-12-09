const express = require("express");
const router = express.Router();

const {
  funkoShopList,
  funkoShopCreate,
  funkoCreate,
} = require("../controllers/funkoShopController");
const multer = require("multer");
const passport = require("passport");

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
router.post(
  "/",

  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  funkoShopCreate
);

//create
router.post(
  "/:shopsId/funkos",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  funkoCreate
);

module.exports = router;
