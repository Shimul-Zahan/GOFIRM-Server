const Billing = require("../../models/biling_model");

const submitBilling = async (req, res) => {
    try {
        const { firstName, lastName, companyName, country, streetAddress, townCity, stateCounty, postcodeZIP, phone, email, orderNotes } = req.body;

        const newBilling = new Billing({
            firstName,
            lastName,
            companyName,
            country,
            streetAddress,
            townCity,
            stateCounty,
            postcodeZIP,
            phone,
            email,
            orderNotes
        });

        await newBilling.save();
        res.json(newBilling);
    } catch (error) {
        console.error('Error saving billing details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { submitBilling };