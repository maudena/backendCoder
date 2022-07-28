const express = require("express");
const router = require("./routes/routes");
const app = express();




app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/", router);

const server = app.listen(8080, () => {
  console.log("Servidor ok en 8080");
});
server.on("error", (error) => `Error en el servidor ${error}`);
