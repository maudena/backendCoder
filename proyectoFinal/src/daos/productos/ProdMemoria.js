import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

export class ProdMemoria extends ContenedorMemoria {
  constructor() {
    super("productos", {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

