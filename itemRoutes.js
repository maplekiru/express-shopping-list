const express = require("express");
const db = require("./fakeDb");
const router = new express.Router();

/** GET /items: get list of items */
router.get("/items", function (req, res, next) {
  return res.json(db.items);
});

/** POST /items: create item and add to items array */
router.post("/items", function (req, res, next) {
  const item = {
    name: req.body.name,
    price: req.body.price
  }

  db.items.push(item);

  return res.json({ added: item });
});





/** DELETE /items/[id]: delete user, return {message: Deleted} */
router.delete("/:id", function (req, res, next) {
  db.User.delete(req.params.id);
  return res.json({ message: "Deleted" });
});

module.exports = router;