const sql = require("./db.js");

const Horarios = function (horarios) {
  this.title = horarios.title;
  this.description = horarios.description;
  this.published = horarios.published;
};

Horarios.create = (newComputador, result) => {
  sql.query("INSERT INTO horarios SET ?", newComputador, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created computador: ", { id: res.insertId, ...newComputador });
    result(null, { id: res.insertId, ...newComputador });
  });
};

Horarios.findById = (id, result) => {
  sql.query(`SELECT * FROM horarios WHERE macAddress = ${id}`, (err, res) => {
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

Horarios.getAll = (result) => {
  let query = "SELECT * FROM horarios;";

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

Horarios.updateById = (id, computador, result) => {
  sql.query(
    "UPDATE horarios SET title = ?, description = ?, published = ? WHERE id = ?",
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

Horarios.remove = (id, result) => {
  sql.query("DELETE FROM horarios WHERE id = ?", id, (err, res) => {
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

Horarios.removeAll = result => {
  sql.query("DELETE FROM horarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} horarios`);
    result(null, res);
  });
};

module.exports = Horarios;
