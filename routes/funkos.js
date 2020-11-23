const express = require("express");
const router = express.Router();

const {
  funkoList,
  funkoCreate,
  funkoDelete,
  funkoUpdate,
} = require("../controllers/funkoController");

//List
router.get("/", funkoList);

//create
router.post("/", funkoCreate);

//delete
router.delete("/:funkoId", funkoDelete);

//Update
router.put("/:funkoId", funkoUpdate);

module.exports = router;
