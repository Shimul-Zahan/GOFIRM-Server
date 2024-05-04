const express = require('express');
const { getAllProducts, addCategory, upload, getAllCat, addProducts } = require('../controllers/shop_controller/products');
const { registration, login, googleLogin } = require('../controllers/auth_controllers/auth');
const { add_to_cart } = require('../controllers/shop_controller/cart_controllers');
const { add_to_whisList } = require('../controllers/shop_controller/whislist');
const { add_to_compare } = require('../controllers/shop_controller/Compare');
const router = express.Router();


router.get('/get-all-products', getAllProducts);
router.get('/get-all-cat', getAllCat);
router.post('/add-category', upload.single("image"), addCategory)
router.post('/add-product', upload.single("image"), addProducts)

// auth routes here
router.post('/registration', upload.single("image"), registration)
router.post('/login', login)
router.post('/googleLogin', googleLogin)

// cartItems here
router.post('/add-to-cart', add_to_cart)

// whislist here
router.post('/add-to-whislist', add_to_whisList)

// add to compare
router.post('/add-to-compare', add_to_compare)





module.exports = router;