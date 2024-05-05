const express = require('express');
const { getAllProducts, addCategory, upload, getAllCat, addProducts, updateProduct, deleteProduct, search } = require('../controllers/shop_controller/products');
const { registration, login, googleLogin } = require('../controllers/auth_controllers/auth');
const { add_to_cart, get_cart_by_user, deleteCartItem } = require('../controllers/shop_controller/cart_controllers');
const { add_to_whisList, get_white_by_user, deleteWhiteItem } = require('../controllers/shop_controller/whislist');
const { add_to_compare, getLastTwoItems } = require('../controllers/shop_controller/Compare');
const { submitBilling } = require('../controllers/shop_controller/billing');
const { checkout, paymentSuccess, getLatestPayment } = require('../controllers/payment');
const router = express.Router();


router.get('/get-all-products', getAllProducts);
router.get('/get-all-cat', getAllCat);
router.post('/add-category', upload.single("image"), addCategory)
router.post('/add-product', upload.single("image"), addProducts)
router.put('/update-product/:productId', updateProduct);
router.delete('/delete-product/:id', deleteProduct);
router.get('/search', search);

// auth routes here
router.post('/registration', upload.single("image"), registration)
router.post('/login', login)
router.post('/googleLogin', googleLogin)

// cartItems here
router.post('/add-to-cart', add_to_cart)
router.get('/get-cart', get_cart_by_user)
router.delete('/delete-cart-item/:productId', deleteCartItem)

// whislist here
router.get('/get-white', get_white_by_user)
router.post('/add-to-whislist', add_to_whisList)
router.delete('/whitelist/:itemId', deleteWhiteItem);

// add to compare
router.post('/add-to-compare', add_to_compare)
router.get('/get-to-compare', getLastTwoItems)

// billing
router.post('/submit-billing', submitBilling);

// payment
router.post('/checkout', checkout)
router.post('/success', paymentSuccess)
router.get('/get-latest-payment', getLatestPayment)





module.exports = router;