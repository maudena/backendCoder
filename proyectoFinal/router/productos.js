const express = require("express");
const { Router } = express;
const router = Router();
const data = require("../dataProd");

router.get("/productos", (req, res) => {
  const items = data.list();
  const datos = new data.Contenedor("productos");
  datos.save(items);
  res.json(items);
});

router.get("/productos/:id", (req, res) => {
  const { id } = req.params;
  res.json(data.findId(parseInt(id)));
});

router.post("/productos", (req, res) => {
  const admin = true;
  if (admin == true) {
    const items = data.list();
    if (req.body.item) {
      data.push(req.body.item);
      res.status(201).json({ Agregado: req.body.item });
    }
    if (!req.body.item) {
      const newItem = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        code: Math.random(),
        timestamp: Date.now(),
        id: data.list().length + 1,
        inCart: false,
      };
      items.push(newItem);
      const datos = new data.Contenedor("productos");
      datos.save(newItem);
      res.status(201).json({ Agregado: newItem });
    }
  } else {
    throw new Error("Ruta no autorizada");
  }
});

router.delete("/productos/:id", (req, res) => {
  const admin = true;
  if (admin == true) {
    const id = Number(req.params.id);
    const items = data.list();
    if (id > items.length || id < 1) {
      res.json("error: producto no encontrado");
    } else {
      items.forEach((item, i) => {
        if (item.id === id) items.splice(i, 1);
      });
      const datos = new data.Contenedor("productos");
      datos.save(items);
      res.status(204).end();
    }
  } else {
    throw new Error("Ruta no autorizada");
  }
});

router.put("/productos/:id", (req, res) => {
  const admin = true;

  if (admin == true) {
    const id = req.params.id;
    const items = data.list();
    if (id > items.length || id < 1) {
      res.json("error: producto no encontrado");
    } else {
      items.filter((item) => {
        if (item.id == id) {
          item.price = req.body.price;
          item.name = req.body.name;
          item.thumbnail = req.body.thumbnail;
        }
      });
      const datos = new data.Contenedor("productos");
      datos.save(items);
      res.json(items);
    }
  } else {
    throw new Error("Ruta no autorizada");
  }
});


module.exports = router;
