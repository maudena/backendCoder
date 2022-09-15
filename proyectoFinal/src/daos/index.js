import dotenv from "dotenv"
dotenv.config()
let productosDao;
let carritosDao;

import { ProdMemoria } from "./productos/ProdMemoria.js";
import CartMemoria from "./carritos/CartMemoria.js";
import ProdArchivo from "./productos/ProdArchivo.js";
import CartArchivo from "./carritos/CartArchivo.js"
import ProdMongoDB from "./productos/ProdMongoDB.js";
import CartMongoDB from "./carritos/CartMongoDB.js";
import ProdFirebase from "./productos/ProdFirebase.js";
import CartFirebase from "./carritos/CartFirebase.js";


switch (process.env.PERS) {
  case "json":

    productosDao = new ProdArchivo
    carritosDao = new CartArchivo

    break;

  case "firebase":

    productosDao = new ProdFirebase
    carritosDao = new CartFirebase

    break;

  case "mongo":

    productosDao = new ProdMongoDB;
    carritosDao = new CartMongoDB;

    break;

  default:

    productosDao = new ProdMemoria;
    carritosDao = new CartMemoria;

    break;
}

export { productosDao, carritosDao };
