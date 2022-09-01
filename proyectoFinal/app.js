import express from 'express';
import routerProductos from "./router/productos.js";
import routerCart from "./router/cart.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();


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


const server = app.listen(8080, () => {
    console.log("Servidor ok en 8080");
  });
  server.on("error", (error) => `Error en el servidor ${error}`);