import { json } from "express";
import express from 'express';
const { Router } = express;
const routerCart = Router();

import {carritosDao as carritosApi} from "../src/daos/index.js"
import {productosDao as productosApi} from "../src/daos/index.js"

routerCart.get("/carrito", async (req, res) => {
  res.json((await carritosApi.listarAll()).map(c => c.id));
});

routerCart.get("/carrito/:id/productos", async (req, res) => {
  const carrito = carritosApi.listar(req.params.id)
  res.json(carrito)
});

routerCart.post("/carrito", async (req, res) => {
  res.json(await carritosApi.guardar());
});

routerCart.delete("/carrito/:id", async (req, res) => {
  res.json(await carritosApi.delete(req.params.id))
});

routerCart.delete("/carrito/:id/productos/:id_prod", async (req, res) => {
  const carrito = await carritosApi.listar(req.params.id)
  const index = carrito.productos.findIndex(p => p.id == req.params.id_prod)
  if(index != -1){
    carrito.productos.splice(index, 1)
    await carritosApi.update(carrito)
  }
  res.end();
});

routerCart.post("/carrito/:id/productos/:id_prod", async (req, res) => {
  const carrito = await carritosApi.listar(req.params.id)
  const producto = await productosApi.listar(req.params.id_prod)
  carrito.productos.push(producto)
  await carritosApi.update(carrito)

  res.json(carrito);
});

export default routerCart;
