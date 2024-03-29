import { json } from "express";
import express from 'express';
const { Router } = express;
const routerCart = Router();

import {carritosDao as carritosApi} from "../src/daos/index.js"
import {productosDao as productosApi} from "../src/daos/index.js"

routerCart.get("/carrito", async (req, res) => {
  res.json(await carritosApi.listarAll());
});

routerCart.get("/carrito/:id/productos", async (req, res) => {
  const carrito = await carritosApi.listar(req.params.id)
  res.json(carrito)
});

routerCart.post("/carrito", async (req, res) => {
  res.json(await carritosApi.guardar());
});

routerCart.delete("/carrito/:id", async (req, res) => {
  res.json(await carritosApi.delete(req.params.id))
});

routerCart.delete("/carrito", async (req, res) => {
  const admin = true
  if(admin == true){
    res.json(await carritosApi.deleteAll())
  } else {
    throw new Error("Ruta no autorizada");
  }
});

routerCart.delete("/carrito/:id/productos/:id_prod", async (req, res) => {
  const carrito = await carritosApi.listar(req.params.id)
  const index = carrito.productos.findIndex(p => p.id == req.params.id_prod)
  const indexMongo = carrito.productos.findIndex(p => p._id == req.params.id_prod)
  console.log(index);
  if(index != -1){
    carrito.productos.splice(index, 1)
    await carritosApi.actualizar(carrito)
  }
  else if(indexMongo != -1){
    carrito.productos.splice(index, 1)
    await carritosApi.actualizar(carrito)
  }
  res.end();
});

routerCart.post("/carrito/:id/productos/:id_prod", async (req, res) => {
  const carrito = await carritosApi.listar(req.params.id)
  const producto = await productosApi.listar(req.params.id_prod)

  carrito.productos.push(producto)
  await carritosApi.actualizar(carrito)
  res.json(carrito);
});

export default routerCart;
