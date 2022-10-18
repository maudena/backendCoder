import cluster from "cluster"
import os from "os"
import express from "express";
import getRandom from "./routes/random.js";

const app = express();
const numCpus = os.cpus().length

if (cluster.isPrimary) {
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
} else {
  const PORT = process.argv[2]
  const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
  server.on("error", (error) => {
    console.error(`Error en el servidor ${error}`);
  });
}

app.get("/api/randoms", (req, res) => {
  console.log(`Corriendo en puerto ${PORT} proceso ${process.pid}`);
  res.send(getRandom(1, 1000));
});

