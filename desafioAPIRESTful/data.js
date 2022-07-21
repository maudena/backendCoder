const listaProductos = [];

const list = () => {
    return listaProductos
}

const findId = (id) => {
    return listaProductos.find((item) => item.id === id)
}


module.exports = { findId, list }

for (let i = 0; i < listaProductos.length; i++) {
    module.exports.add(listaProductos[i].itemName, listaProductos[i].precio, listaProductos[i].img);
}