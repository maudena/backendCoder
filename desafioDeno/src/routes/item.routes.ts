import { Router } from "../../deps.ts";
import {findAll, findItem, createItem, updateItem, deleteItem} from "../handlers/item.handlers.ts"

export const router = new Router()
    .get("/api/productos", findAll)
    .get("/api/productos/:productId", findItem)
    .post("/api/productos", createItem)
    .put("/api/productos/:productId", updateItem)
    .delete("/api/productos/:productId", deleteItem)
 