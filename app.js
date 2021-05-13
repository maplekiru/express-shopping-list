const express = require("express");
const app = express();

const{ NotFoundError } = require("./expressError");
const {logger} = require('./logger');
const itemRoutes = require('./itemRoutes')

// process JSON body => req.body
app.use(express.json());
// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use("/items", itemRoutes);

// TODO: 
// - double check import / export everything
// - Docstrings!

// - update package.json scripts
// - add testing

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});


/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;