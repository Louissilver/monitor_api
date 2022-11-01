module.exports = app => {
  const computadores = require("../controllers/computador.controller.js");

  var router = require("express").Router();

  // Create a new Computador
  router.post("/", computadores.create);

  //Retrieve all Computadores
  router.get("/", computadores.findAll);

  // Retrieve a single Computador with id
  router.get("/:id", computadores.findOne);

  // Update a Computador with id
  router.put("/:id", computadores.update);

  // Delete a Computador with id
  router.delete("/:id", computadores.delete);

  // Delete all Computadores
  router.delete("/", computadores.deleteAll);

  app.use('/api/computadores', router);
};
