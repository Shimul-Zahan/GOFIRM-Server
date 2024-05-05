const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'shimu6636d29e6ee90'
const store_passwd = 'shimu6636d29e6ee90@ssl'
const is_live = false

const express = require('express');
const Payment = require('../models/payment_model');
const Cart = require('../models/cart_collection');
const app = express();

app.use(express.json());

let userSendsData = {};

const checkout = async (req, res) => {

    const { name, email, totalPrice, prods } = req.body;

    try {

        userSendsData = { name, email, totalPrice, prods };

        const data = {
            total_amount: totalPrice,
            currency: 'BDT',
            tran_id: "xxxx54544sdhg55",
            success_url: 'http://localhost:5000/api/success',
            fail_url: 'http://localhost:3030/fail',
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: name,
            cus_email: email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            console.log(data);
            let GatewayPageURL = apiResponse.GatewayPageURL
            console.log(GatewayPageURL);
            res.send({ url: GatewayPageURL })
            console.log('Redirecting to: ', GatewayPageURL)
            // Include name, email, totalPrice, and prods in the response
        });

    } catch (error) {

    }
}

const paymentSuccess = async (req, res, next) => {
    try {
        // Use the stored data from userSendsData
        const { name, email, totalPrice, prods } = userSendsData;

        console.log('Payment successful for:', { name, email, totalPrice, prods });

        const payment = new Payment({
            name,
            email,
            totalPrice,
            products: prods,
            paymentStatus: 'success'
        });

        await payment.save();

        // Delete all cart items with the provided email
        console.log(payment);


        await Cart.deleteMany({ email });
        console.log(`Deleted cart items for email: ${email}`);

        // Redirect to the success page
        // res.redirect('http://localhost:5173/order');

        // Respond with a success message
        // res.status(200).json({ message: 'Payment successful' });

        // Redirect to the success page
        res.redirect('http://localhost:5173/order');
    } catch (error) {
        console.error('Error processing payment success:', error);
        res.status(500).json({ error: 'An error occurred during payment success processing' });
    }
}


const getLatestPayment = async (req, res) => {
    const { email } = req.query;

    try {
        // Find the latest payment data for the provided email
        const latestPayment = await Payment.findOne({ email }).sort({ createdAt: -1 });

        res.status(200).json(latestPayment);
    } catch (error) {
        console.error('Error fetching latest payment data:', error);
        res.status(500).json({ error: 'An error occurred while fetching latest payment data' });
    }
};

module.exports = { checkout, paymentSuccess, getLatestPayment }