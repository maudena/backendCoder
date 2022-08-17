const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const {Server: HttpServer} = require("http");
const {Server: Socket} = require("socket.io");
const { createTables } = require("./createTables");
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)
const {options} = require("./options/mariaDB")
const {optionSqlite} = require("./options/sqliteDB")
const knex = require("knex")(options)
const knexSqlite = require("knex")(optionSqlite)
const data = []
const mensajes = []

createTables()
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "index.html",
    layoutsDir: __dirname + "/public",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));




io.on('connection', (socket) => {
  console.log('Usuario conectado')

  socket.emit("productos", data)

  socket.on("update", function(item){
    data.push(item)
    knex("productos").insert(item).then(() =>{
      console.log("Productos agregados a la base de datos");
    })
    io.sockets.emit("productos", data)
  })

  socket.emit("mensajes", mensajes)

  socket.on("newMsj", async mensaje => {
    mensaje.fyh = new Date().toLocaleString();
    await mensajes.push(mensaje)
    knexSqlite("mensajes").insert(mensaje).then(() =>{
      console.log("Mensajes agregados a la base de datos");
    })
    io.sockets.emit("mensajes", await mensajes)
  })

})

const server = httpServer.listen(8080, () => {
  console.log("Servidor ok en 8080");
});
server.on("error", (error) => `Error en el servidor ${error}`);
