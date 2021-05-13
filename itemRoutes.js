const express = require("express");
const db = require("./fakeDb");
const {NotFoundError, BadRequestError} = require("./expressError")
const router = new express.Router();

/** GET /items: get list of items */
router.get("/", function (req, res, next) {
  return res.json(db.items);
});

/** POST /items: create item and add to items array */
router.post("/", function (req, res, next) {

  const item = {
    name: req.body.name,
    price: req.body.price
  };
  if (item.name === undefined || item.price === undefined){
    throw new BadRequestError(`Please input both a name and a price`)
  }
  db.items.push(item);

  return res.json({ added: item });
});

/** GET /items/:name to return a single item */ //show JSON in docstring!!!
router.get("/:name", function (req, res, next) {
  let name = req.params.name;
  let item = db.items.find(i => i.name === name);
  if (item === undefined){
    throw new NotFoundError(`Can't find ${name}`);
  }
  return res.json(item);
});

/** PATCH /items/:name to modify an item and return it */
router.patch("/:name", function (req, res, next) {
  let name = req.params.name;
  let itemIndex = db.items.findIndex(i => i.name === name);
  if (itemIndex === -1){
    throw new NotFoundError(`Can't find ${name}`);
  }
  const item = {
    name: req.body.name,
    price: req.body.price
  };
  db.items[itemIndex] = item;
  return res.json({updated: item})
})


/** DELETE /items/[id]: delete item, return {message: Deleted} */
router.delete("/:name", function (req, res, next) {
  let name = req.params.name;
  let itemIndex = db.items.findIndex(i => i.name === name);
  if (itemIndex === -1){
    throw new NotFoundError(`Can't find ${name}`);
  }
  db.items.splice(itemIndex, 1);
  return res.json({ message: "Deleted" });
});

module.exports = router;