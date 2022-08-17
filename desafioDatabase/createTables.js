const { options } = require("./options/mariaDB");
const { optionSqlite } = require("./options/sqliteDB");
const knex = require("knex")(options);
const knexSqlite = require("knex")(optionSqlite);

const createTables = () => {
  knex.schema
    .createTable("productos", (table) => {
      table.increments("id");
      table.string("item");
      table.integer("precio");
      table.integer("cantidad");
    })
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      knex.destroy;
    });

  knexSqlite.schema
    .createTable("mensajes", (table) => {
      table.increments("id");
      table.string("autor");
      table.string("fyh");
      table.string("texto");
    })
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      knex.destroy;
    });
};

module.exports = {createTables}