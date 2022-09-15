import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";

class ProdFirebase extends ContenedorFirebase {
  constructor() {
    super("productos", {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

export default ProdFirebase;