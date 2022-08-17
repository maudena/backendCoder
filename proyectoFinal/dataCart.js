const fs = require("fs")
const carts = [];

class Cart {
    constructor(){
        this.id = carts.length + 1
        this.timestamp = Date.now()
        this.productos = [];
    }
    addToCarts(){
        const newCart = new Cart()
        carts.push(newCart)
    }
    list(){
        return carts
    }

}
const findId = (id) =>{
    return carts.find((item) => item.id === id)
}


class Contenedor {
    constructor(fileName) {
        this.fileName = fileName + ".txt";
    }

    async save(objeto) {
        try {
            if (fs.existsSync(this.fileName + '.txt')) {
                const data = await fs.promises.readFile(this.fileName);
                const array = JSON.parse(data);
                array.push(objeto);
                await fs.promises.writeFile(this.fileName, JSON.stringify(array, null, 2));
                
            } else {
                await fs.promises.writeFile(this.fileName, JSON.stringify(objeto, null, 2));
                
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}




module.exports = { carts, Cart, findId, Contenedor }
