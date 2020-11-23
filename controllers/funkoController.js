const slugify = require("slugify");
let funkos = require("../funkos");

exports.funkoList = (req, res) => {
  try {
    res.json(funkos);
  } catch (error) {
    console.error("FunkoStore -> fetchFunkos -> error", error);
  }
};

exports.funkoCreate = (req, res) => {
  const id = funkos[funkos.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });

  const newFunko = { id, slug, ...req.body };
  funkos.push(newFunko);
  res.status(201).json(newFunko);
};

exports.funkoDelete = (req, res) => {
  const { funkoId } = req.params;
  const foundFunko = funkos.find((funko) => funko.id === +funkoId);
  if (foundFunko) {
    funkos = funkos.filter((funko) => funko.id !== +funkoId);
    res.status(204).end();
    console.log("funkos", funkos);
  } else {
    res.status(404).json({ message: "Funko not found" });
  }
};

exports.funkoUpdate = (req, res) => {
  const { funkoId } = req.params;
  const foundFunko = funkos.find((funko) => funko.id === +funkoId);
  if (foundFunko) {
    for (const key in req.body) foundFunko[key] = req.body[key];
    foundFunko.slug = slugify(req.body.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Funko not found" });
  }
};
