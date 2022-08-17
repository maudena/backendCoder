const express = require("express")
const routerProductos = require ("./router/productos");
const routerCart = require("./router/cart")
const app = express();
const server = app.listen(8080, ()=>{
    console.log("Servidor ok en 8080");
})
server.on("error", (error)=> `Error en el servidor ${error}`)

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api", routerProductos)
app.use("/api", routerCart)

app.use((req,res,next)=>{
    const err = new Error("Not Found")
    err.status = 404;
    next(err)
})
app.use((err, req, res, next) =>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message,
        }
    })
})