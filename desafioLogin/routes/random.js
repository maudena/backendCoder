process.send("hola")
process.on("message", (msg) =>{
    console.log(msg);
})

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const array = []
  for(let i = 0; i <= 10; i++){
   const num = Math.floor(Math.random() * (max - min) + min);
   console.log(num);
   array.push(num)
  }
  return array
}

