const Computador = require("../models/computador.model.js");

//Create and Save a new Computador
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Computador
  const computador = new Computador({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Computador in the database
  Computador.create(computador, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Computador."
      });
    else res.send(data);
  });
};

//Retrieve all Computadores from the database (with condition).
exports.findAll = (req, res) => {

  Computador.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro durante a busca dos computadores."
      });
    else res.send(data);
  });
};

//Retrieve all Computadores from the database (with condition).
exports.findAllOn = (req, res) => {

  Computador.getAllOn((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro durante a busca dos computadores."
      });
    else res.send(data);
  });
};

// Find a single Computador by Id
exports.findOne = (req, res) => {
  Computador.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Computador with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Computador with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Computador identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Computador.updateById(
    req.params.id,
    new Computador(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Computador with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Computador with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Computador with the specified id in the request
exports.delete = (req, res) => {
  Computador.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Computador with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Computador with id " + req.params.id
        });
      }
    } else res.send({ message: `Computador was deleted successfully!` });
  });
};

// Delete all Computadores from the database.
exports.deleteAll = (req, res) => {
  Computador.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Computadores."
      });
    else res.send({ message: `All Computadores were deleted successfully!` });
  });
};
