const socket = io();

const addItem = document.getElementById("addItem");

addItem.addEventListener("submit", (e) => {
  e.preventDefault();
  const item = {
    item: addItem[0].value,
    precio: addItem[1].value,
    cantidad: addItem[2].value,
  };
  socket.emit("update", item);
  addItem.reset();
});

socket.on("productos", (data) => {
    console.log(data)
  getTable(data).then((html) => {
    document.getElementById("productos").innerHTML = html;
  });
});

function getTable(data) {
  return fetch("/views/partials/table.hbs")
    .then((res) => res.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({data});
      return html;
    });
}

const username = document.getElementById("email")
const newMensaje = document.getElementById("mensaje")
const sendMensaje = document.getElementById("sendMsj")

const formMensaje = document.getElementById("containerMsj")
    formMensaje.addEventListener("submit", (e) =>{
        e.preventDefault();
        const mensaje ={
            autor: username.value,
            texto: newMensaje.value
        }
        socket.emit("newMsj", mensaje)
        formMensaje.reset();
    })

    socket.on("mensajes", (mensajes) => {
        console.log(mensajes)
        let html = mensajes.map(function(mensajes, index){
            return(`<p>${mensajes.autor} ${mensajes.fyh} ${mensajes.texto}</p>`)
        }).join("<br>")
        document.getElementById("containerMsjs").innerHTML = html;
    })

module.exports = { getTable }