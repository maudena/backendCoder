const express = require("express")
const { Router } = express
const router = Router()
const data = require("../data")



router.get("/productos", (req, res) => {
    const items = data.list()
    res.json(items)
})
router.get("/productos/:id", (req, res) => {

    const { id } = req.params;
    const items = data.list()
    if(id > items.length || id < items.length ){
        res.json("error: producto no encontrado")
    }else{
        res.json(data.findId(parseInt(id)))
    }
    
})

router.post("/productoAdd", (req, res) => {

    if (req.body.item) {
        data.push(req.body.item)
        res.status(201).json({ Agregado: req.body.item })
    }
    if (!req.body.item) {
        const newItem = {
            name: req.body.itemName,
            price: req.body.precio,
            thumbnail: req.body.img,
            id: data.list().length + 1
        }
        data.list().push(newItem);
        res.status(201).json({ Agregado: newItem })
    }
})

router.delete("/productos/:id", (req, res) =>{
    const id = Number(req.params.id);
    const items = data.list();
    if(id > items.length || id < items.length ){
        res.json("error: producto no encontrado")
    }else{
        items.forEach((item, i) => {
            if (item.id === id) items.splice(i, 1);
          });
        res.status(204).end()
    }
    
})

router.put("/productos/:id", (req, res) =>{
    const id = req.params.id;
    const items = data.list();

    if(id > items.length || id < items.length ){
        res.json("error: producto no encontrado")
    }else{
        items.filter(item =>{
            if(item.id == id){
                item.price = req.body.price;
            }
        })
        res.json(items)
    }
})

module.exports = router