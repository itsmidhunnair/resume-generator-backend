const filterObjects = (object, keys) => {
  keys.map((key) => delete object[key]);
  return object;
};

module.exports = filterObjects;
