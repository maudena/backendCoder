export default function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const array = []
  for(let i = 0; i <= 10000; i++){
   const num = Math.floor(Math.random() * (max - min) + min);
   array.push(num)
  }
  return array
}

