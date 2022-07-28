const express = require("express")
const { Router } = express
const router = Router()
const data = []

router.get("/",(req,res)=>{
    res.render("index", {data})
})

router.post("/productos", (req, res) => {
    data.push(req.body)
    res.redirect('back')
})

router.get("/productos", (req, res) => {
    res.render("./partials/table", {data})
})



module.exports = router