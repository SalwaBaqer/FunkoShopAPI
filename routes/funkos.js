const express = require("express");
const router = express.Router();

const {
  funkoList,
  funkoCreate,
  funkoDelete,
  funkoUpdate,
  fetchFunko,
} = require("../controllers/funkoController");

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

//create
router.post("/", funkoCreate);

//delete
router.delete("/:funkoId", funkoDelete);

//Update
router.put("/:funkoId", funkoUpdate);

module.exports = router;
