import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class ProdArchivo extends ContenedorArchivo {
  constructor() {
    super("productos.json", {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

export default ProdArchivo;
