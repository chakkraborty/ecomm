const { Router } = require("express");
const productController = require("../controllers/productControllers");
const router = Router();
router.get("/products", productController.getProducts);
router.post("/addProduct", productController.addProducts);

module.exports = router;
