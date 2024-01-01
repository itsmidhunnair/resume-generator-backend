/**
 * Will throw a custom error with provided code and message.
 * will also set success to false.
 *
 * @param {Number} code
 * @param {String} msg
 */
const handleError = (code, msg) => {
  const error = new Error();
  error.message = msg || 'Some Error Occured';
  error.code = code || 400;
  error.success = false;
  throw error;
};

module.exports = handleError;
