

/** Logger: prints log message and goes to next. */
function logger(req, res, next) {
  console.log(`Sending ${req.method} request to ${req.path}.`);
  return next();
  }

  module.exports = { logger };