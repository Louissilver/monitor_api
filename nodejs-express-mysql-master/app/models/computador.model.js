const sql = require("./db.js");

const Computador = function (computador) {
  this.title = computador.title;
  this.description = computador.description;
  this.published = computador.published;
};

Computador.create = (newComputador, result) => {
  sql.query("INSERT INTO computadores SET ?", newComputador, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created computador: ", { id: res.insertId, ...newComputador });
    result(null, { id: res.insertId, ...newComputador });
  });
};

Computador.findById = (id, result) => {
  sql.query(`SELECT * FROM computadores WHERE macAddress = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found computador: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Computador.getAll = (result) => {
  let query = "SELECT * FROM computadores;";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("maquinas: ", res);
    result(null, res);
  });
};

Computador.getAllOn = (result) => {
  let query = "SELECT DISTINCT h.macAddress, MAX(hora_final) as ultimaHoraLigado FROM horarios h JOIN computadores c ON c.macAddress = h.macAddress WHERE h.data = CURDATE();";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("maquinas: ", res);
    result(null, res);
  });
};

Computador.updateById = (id, computador, result) => {
  sql.query(
    "UPDATE computadores SET title = ?, description = ?, published = ? WHERE id = ?",
    [computador.title, computador.description, computador.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated computador: ", { id: id, ...computador });
      result(null, { id: id, ...computador });
    }
  );
};

Computador.remove = (id, result) => {
  sql.query("DELETE FROM computadores WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted computador with id: ", id);
    result(null, res);
  });
};

Computador.removeAll = result => {
  sql.query("DELETE FROM computadores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} computadores`);
    result(null, res);
  });
};

module.exports = Computador;
