import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

class CartMemoria extends ContenedorMemoria{
  
    async guardar(carrito = {productos: []}){
        return super.guardar(carrito)
    }
}

export default CartMemoria