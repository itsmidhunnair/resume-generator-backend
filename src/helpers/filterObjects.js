const filterObjects = (object, keys) => {
  const filteredObj = object;
  keys.map((key) => delete filteredObj[key]);
  return filteredObj;
};

module.exports = filterObjects;
