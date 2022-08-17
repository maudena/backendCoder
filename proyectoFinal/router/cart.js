const { json } = require("express");
const express = require("express");
const { Router } = express;
const routerCart = Router();
const dataCart = require("../dataCart");
const productos = require("../dataProd");

routerCart.get("/carrito", (req, res) => {
  res.json(dataCart.carts);
});

routerCart.get("/carrito/:id/productos", (req, res) => {
  const { id } = req.params;
  const cart = dataCart.findId(parseInt(id));
  res.json(cart.productos);
});

routerCart.post("/carrito", (req, res) => {
  const newCart = new dataCart.Cart();
  newCart.addToCarts();
  const datos = new dataCart.Contenedor("carrito");
  datos.save(dataCart.carts);
  res.json(newCart.id);
});

routerCart.delete("/carrito/:id", (req, res) => {
  const id = Number(req.params.id);
  const items = dataCart.carts;
  if (id > items.length || id == 0) {
    res.json("error: carrito no encontrado");
  } else {
    items.forEach((item, i) => {
      if (item.id === id) items.splice(i, 1);
    });
    const datos = new dataCart.Contenedor("carrito");
    datos.save(dataCart.carts);
    res.status(204).end();
  }
});

routerCart.delete("/carrito/:id/productos/:id_prod", (req, res) => {
  const idCart = Number(req.params.id);
  const idProd = Number(req.params.id_prod);
  const cart = dataCart.findId(idCart);

  cart.productos.forEach((item, i) => {
    if (item.id === idProd) cart.productos.splice(i, 1);
  });
  const datos = new dataCart.Contenedor("carrito")
  datos.save(dataCart.carts)
  res.status(204).end();
});

routerCart.post("/carrito/:id/productos", (req, res) => {
  const { id } = req.params;
  const item = productos.findId(parseInt(id));
  const carts = dataCart.carts;
  carts[0].productos.push(item);
  item.inCart = true;
  const datos = new dataCart.Contenedor("carrito")
  datos.save(dataCart.carts)
  res.json(item);
});


module.exports = routerCart;
