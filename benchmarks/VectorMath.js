const Victor = require('victor')

function makeItBurn(name, benchMethod, n = 10000000) {
  let times = n
  let timeStart = Date.now()

  while(times-- > 0){
    benchMethod()
  }

  let timeEnd = Date.now()
  let duration = (timeEnd - timeStart)
  console.log(`Stress test on ${name}: ${duration} ms`)
  return duration
}

//
// Test vector sum with objects
//
let x = 'x'
let y = 'y'
const sumVectorObject = () => {
  let a = {x: Math.random(), y: Math.random()}
  let b = {x: Math.random(), y: Math.random()}
  let c = {x: a[x] + b[x], y: a[y] + b[y]}
  return c;
}

const sumVectorArray = () => {
  let a = [Math.random(), Math.random()]
  let b = [Math.random(), Math.random()]
  let c = [a[0] + b[0], a[1] + b[1]]
  return c;
}

const sumVectorVictor = () => {
  let a = new Victor(Math.random(), Math.random())
  let b = new Victor(Math.random(), Math.random())
  let c = a.clone().add(b)
  return c;
}

const sumVectorObjectLikeArray = () => {
  let a = {'0': Math.random(), '1': Math.random()}
  let b = {'0': Math.random(), '1': Math.random()}
  let c = {'0': a['0'] + b['0'], '1': a['1'] + b['1']}
  // 4294967295
  return c;
}

makeItBurn('sumVectorObject', sumVectorObject);
makeItBurn('sumVectorArray', sumVectorArray);
makeItBurn('sumVectorVictor', sumVectorVictor);
makeItBurn('sumVectorObjectLikeArray', sumVectorObjectLikeArray);


//
// Table Mapping
//
const mapTableArray = () => {
  let l = []
  for (let i = 0; i < 100000; i++){
    let k = i % 1000
    if(l.indexOf(k) < 0)
      l.push(k)
  }
}

const mapTableObject = () => {
  let l = {}
  for (let i = 0; i < 100000; i++){
    let k = i % 1000
    if(!(k in l))
      l[k] = true
  }
}

const mapTableObjectStr = () => {
  let l = {}
  for (let i = 0; i < 100000; i++){
    let k = '_' + i % 1000
    if(!(k in l))
      l[k] = true
  }
}

// makeItBurn('mapTableArray', mapTableArray);
// makeItBurn('mapTableObject', mapTableObject);
// makeItBurn('mapTableObjectStr', mapTableObjectStr, 'x');

// makeItBurn('tobjNone', tobjNone);
// makeItBurn('tobjObjKey', tobjObjKey);
// makeItBurn('tobjNumber', tobjNumber, 'x');
// makeItBurn('tobjArrayNumber', tobjArrayNumber, 'x');
// makeItBurn('tobjObjectSymbol', tobjObjectSymbol, 'x');

// for(let i = 100; i < 100000; i *= 10){
//   let a = makeItBurn('sumVectorObject', sumVectorObject, i);
//   let b = makeItBurn('sumVectorObjectLikeArray', sumVectorObjectLikeArray, i);
//   console.log(`${i}: ${b/a} - ${a},${b}`)
// }
