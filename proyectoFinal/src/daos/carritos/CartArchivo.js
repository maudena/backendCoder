import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class CartArchivo extends ContenedorArchivo{
    constructor(){
        super("carritos.json")
    }

    async guardar(carrito = {productos: []}){
        return super.guardar(carrito)
    }
}

export default CartArchivo