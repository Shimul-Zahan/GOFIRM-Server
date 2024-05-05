const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'shimu6636d29e6ee90'
const store_passwd = 'shimu6636d29e6ee90@ssl'
const is_live = false

const checkout = async (req, res) => {

    const { name, email, totalPrice } = req.body;

    console.log({ name, email, totalPrice });

    try {
        const data = {
            total_amount: totalPrice,
            currency: 'BDT',
            tran_id: "xxxx54544sdhg55", // use unique tran_id for each api call
            success_url: `http://localhost:5000/payment-success/${trans_id}`,
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
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.send({ url: GatewayPageURL })
            console.log('Redirecting to: ', GatewayPageURL)
        });

    } catch (error) {

    }
}

const paymentSuccess = async (req, res) => {
    console.log(req.params.tra_id);
}

module.exports = { checkout, paymentSuccess }