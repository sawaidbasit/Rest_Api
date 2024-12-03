const express = require('express');
const router = express.Router();
const {getAllProductsTesting, getAllProducts, AddProducts, deleteProduct} = require ('../controllers/products')

router.route("/").get(getAllProducts);
// router.route("/addProduct").post(AddProducts);
router.delete("/deleteProduct", deleteProduct)
router.post("/addProduct", AddProducts);
router.route("/testing").get(getAllProductsTesting);

module.exports = router;