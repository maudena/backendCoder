import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB";

class CartMongoDB extends ContenedorMongoDB{
    constructor(){
        super('carritos',{
            productos: {type: [], required: true}
        })
    }

    async guardar(carrito = {productos: []}){
        return super.guardar(carrito)
    }
}

export default CartMongoDB