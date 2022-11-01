const Horarios = require("../models/horarios.model.js");

//Create and Save a new Horários
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Horários
  const horarios = new Horarios({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Horários in the database
  Horarios.create(horarios, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Horários."
      });
    else res.send(data);
  });
};

//Retrieve all Horários from the database (with condition).
exports.findAll = (req, res) => {

  Horarios.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro durante a busca dos Horários."
      });
    else res.send(data);
  });
};

// Find a single Horários by Id
exports.findOne = (req, res) => {
  Horarios.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Horários with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Horários with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Horários identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Horarios.updateById(
    req.params.id,
    new Horarios(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Horários with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Horários with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Horários with the specified id in the request
exports.delete = (req, res) => {
  Horarios.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Horários with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Horários with id " + req.params.id
        });
      }
    } else res.send({ message: `Horários was deleted successfully!` });
  });
};

// Delete all Horários from the database.
exports.deleteAll = (req, res) => {
  Horarios.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Horários."
      });
    else res.send({ message: `All Horários were deleted successfully!` });
  });
};
