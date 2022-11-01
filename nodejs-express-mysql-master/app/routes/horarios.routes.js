module.exports = app => {
  const horarios = require("../controllers/horarios.controller.js");

  var router = require("express").Router();

  // Create a new Computador
  router.post("/", horarios.create);

  //Retrieve all Computadores
  router.get("/", horarios.findAll);

  // Retrieve a single Computador with id
  router.get("/:id", horarios.findOne);

  // Update a Computador with id
  router.put("/:id", horarios.update);

  // Delete a Computador with id
  router.delete("/:id", horarios.delete);

  // Delete all Computadores
  router.delete("/", horarios.deleteAll);

  app.use('/api/horarios', router);
};
