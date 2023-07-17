const { Router } = require("express");
const addressController = require("../controllers/addressControllers");
const router = Router();
router.get("/getaddress/:id", addressController.getAddress);
router.post("/postaddress/:id", addressController.addAddress);
module.exports = router;
