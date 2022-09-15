import ContenedorFirebase from "../../contenedores/ContenedorFirebase";

class CartFirebase extends ContenedorFirebase{
    constructor(){
        super('carritos')
    }

    async guardar(carrito = {productos: []}){
        return super.guardar(carrito)
    }
}

export default CartFirebase