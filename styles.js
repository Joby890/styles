const { map, reduce } = require("./utils");

const create = (obj) => {
  return obj;
}

const styles = (obj) => {
  return map(obj, (next) => {
    if(typeof next === "function") {
      return next;
    }
    return create.bind(null,  next);
  });
}

const css = function(...args) {
  return reduce(args, (result, next, key) => {
    return Object.assign(result, next() || {});
  }, {});
}


module.exports = {styles, css}