const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
module.exports.getCart = async (req, res) => {
  const userId = req.params.id;
  //const { userId } = req.body;
  //res.status(201).send(userId);

  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.status(201).send(cart);
    } else {
      res.status(201).send(null);
    }
  } catch (error) {
    console.log(err);
    res.status(500).send("something is wrong");
  }
};

module.exports.addToCart = async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
    let cart = await Cart.findOne({ userId });
    let itemDetails = await Product.findOne({ _id: productId });
    if (!itemDetails) {
      req.status(404).json({
        type: "No found",
        msg: "Invalid req",
      });
    }
    const price = itemDetails.price;
    const title = itemDetails.title;
    const image = itemDetails.image;

    if (cart) {
      let idx = cart.items.findIndex((p) => p.productId == productId);
      if (idx != -1) {
        let productItem = cart.items[idx];
        productItem.quantity += quantity;
        cart.items[idx] = productItem;
      } else {
        cart.items.push({ productId, title, quantity, price, image });
      }
      let sum = 0;
      for (let i = 0; i < cart.items.length; i++) {
        sum += cart.items[i].quantity * cart.items[i].price;
      }
      cart.bill = sum;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        items: [{ productId, title, quantity, price, image }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("some aint right bruh");
  }
};

module.exports.updateCart = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).send("item doesnot exist");
    }
    if (!cart) {
      return res.status(400).second("cart not present");
    } else {
      let idx = cart.items.findIndex((p) => p.productId == productId);
      if (idx == -1) {
        return res.status(404).send("item not in cart");
      } else {
        let curritem = cart.items[idx];
        curritem.quantity = quantity;
        cart.items[idx] = curritem;
      }
      let sum = 0;
      for (let i = 0; i < cart.items.length; i++) {
        sum += cart.items[i].quantity * cart.items[i].price;
      }
      cart.bill = sum;
      cart = await cart.save();
      return res.status(201).send(cart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
};

module.exports.deleteCartItem = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;
  try {
    let cart = await Cart.findOne({ userId });
    let idx = cart.items.findIndex((p) => p.productId == productId);
    if (idx != -1) {
      let proditem = cart.items[idx];
      cart.bill -= proditem.quantity * proditem.price;
      cart.items.splice(idx, 1);
    }
    let x = "abc";
    cart = await cart.save();
    return res.status(201).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send("something wen t wrong");
  }
};

module.exports.placeOrderCart = async (req, res) => {
  const userId = req.params.userId;
  const {
    fullName,
    country,
    mobileNumber,
    pincode,
    houseNumber,
    area,
    city,
    state,
  } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let arr = [];
    if (cart && cart.items.length > 0) {
      let items = cart.items;

      let bill = cart.bill;
      const newOrder = await Order.create({
        userId,
        fullName,
        country,
        mobileNumber,
        pincode,
        houseNumber,
        area,
        city,
        state,
        items,
        bill,
      });
      // cart.items = arr;
      let sum = 0;
      for (let i = 0; i < cart.items.length; i++) {
        sum += cart.items[i].quantity * cart.items[i].price;
      }

      cart.bill = sum;
      cart = await cart.save();
      res.status(201).send(newOrder);
    } else if (cart && cart.items.length == 0) {
      let sum = 0;
      for (let i = 0; i < cart.items.length; i++) {
        sum += cart.items[i].quantity * cart.items[i].price;
      }
      cart.bill = sum;
      cart = await cart.save();

      res.status(201).send(null);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something wen t wrong");
  }
};
