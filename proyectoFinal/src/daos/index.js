let productosDao;
let carritosDao;

import { ProdMemoria } from "./productos/ProdMemoria.js";
import CartMemoria from "./carritos/CartMemoria.js";

switch (process.env.PERS) {
  case "json":
    const prodArchivo = await import("./productos/ProdArchivo.js");
    const cartArchivo = await import("./carritos/CartArchivo.js");

    productosDao = new prodArchivo();
    carritosDao = new cartArchivo();
    break;
  case "firebase":
    break;
  case "mongo":
    const prodMongo = await import("./productos/ProdMongoDB.js");
    const cartMongo = await import("./carritos/CartMongoDB.js");

    productosDao = new prodMongo();
    carritosDao = new cartMongo();
    break;
  default:
    productosDao = new ProdMemoria;
    carritosDao = new CartMemoria;
    break;
}

export { productosDao, carritosDao };
