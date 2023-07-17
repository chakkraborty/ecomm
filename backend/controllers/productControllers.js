const Products = require("../models/Product");
const asyncHandler = require("express-async-handler");

module.exports.getProducts = asyncHandler(async (req, res) => {
  const prods = await Products.find();
  // const prods = "aa";

  res.json(prods);
});

module.exports.addProducts = asyncHandler(async (req, res) => {
  const { title, description, price, image } = req.body;

  const prod = await Products.create({ title, description, price, image });
  if (prod) {
    res.status(201).json({
      _id: prod._id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
      image: prod.image,
    });
  } else {
    res.status(400);
    throw new Error("something is wrong bruh :-(");
  }
});
