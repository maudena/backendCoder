import { productosDao as productosApi } from "../src/daos/index.js"

import express from 'express';
const { Router } = express;
const router = Router();



router.get("/productos", async (req, res) => {
  const productos = await productosApi.listarAll()
  res.json(productos);
});

router.get("/productos/:id", async (req, res) => {
  res.json(await productosApi.listar(req.params.id));
});

router.post("/productos", async (req, res) => {
  const admin = true;
  if (admin == true) {
    res.json(await productosApi.guardar(req.body))
  } else {
    throw new Error("Ruta no autorizada");
  }
});

router.delete("/productos/:id", async (req, res) => {
  const admin = true;
  if (admin == true) {
    res.json(await productosApi.delete(req.params.id))
  } else {
    throw new Error("Ruta no autorizada");
  }
});

router.delete("/productos", async(req, res) =>{
  const admin = true
  if(admin == true){
    res.json(await productosApi.deleteAll())
  } else {
    throw new Error("Ruta no autorizada");
  }
})

router.put("/productos/:id", async (req, res) => {
  const admin = true;

  if (admin == true) {
    res.json(await productosApi.actualizar(req.body))
  } else {
    throw new Error("Ruta no autorizada");
  }
});

export default router;
