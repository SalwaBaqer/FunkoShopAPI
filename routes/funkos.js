const express = require("express");
const router = express.Router();

const {
  funkoList,
  funkoDelete,
  funkoUpdate,
  fetchFunko,
} = require("../controllers/funkoController");
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

router.param("funkoId", async (req, res, next, funkoIdVariable) => {
  const funko = await fetchFunko(funkoIdVariable, next);
  if (funko) {
    req.funko = funko;
    next();
  } else {
    const err = {
      status: 404,
      message: "Funko not found",
    };
    next(err);
  }
});

//List
router.get("/", funkoList);

//delete
router.delete("/:funkoId", funkoDelete);

//Update
router.put("/:funkoId", upload.single("image"), funkoUpdate);

module.exports = router;
