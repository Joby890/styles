
const map = (obj, func) => {
 return reduce(obj, (result, next, key) => {
   if(Array.isArray(result)) {
     result.push(func(next, key, obj));
   } else {
    result[key] = func(next, key, obj);
   }
   return result;
 }, Array.isArray(obj) ? [] : {});
}

const reduce = (obj, func, accum) => {
  if(Array.isArray(obj)) {
    for(let i = 0; i < obj.length; i++) {
      if(accum === undefined) {
        accum = obj[i];
      } else {
        accum = func(accum, obj[i], i, obj);
      }
    }
  } else {
    for(let key in obj) {
      if(accum === undefined) {
        accum = obj[key];
      } else {
        accum = func(accum, obj[key], key, obj);
      }
    }
  }
  return accum;
}

module.exports = { map, reduce };