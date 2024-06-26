const Compare = require("../../models/compare");

const add_to_compare = async (req, res) => {
    try {
        const { _id, productName, selectedCat, price, region, quality, status, quantity, addedTime, orderNotes, image, email } = req.body;
        const newCartItem = new Compare({
            productName,
            selectedCat,
            price,
            region,
            quality,
            status,
            quantity,
            addedTime,
            orderNotes,
            image,
            email,
            oldId: _id
        });
        await newCartItem.save();
        console.log(newCartItem);
        res.json({ message: 'Item added to the compare list successfully', newCartItem });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
const getLastTwoItems = async (req, res) => {
    try {
        const { email } = req.query
        console.log(email);
        const compareItems = await Compare.find({ email }).sort({ addedTime: -1 }).limit(2);
        res.json(compareItems);
    } catch (error) {
        console.error('Error fetching last two items from compare list:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { add_to_compare, getLastTwoItems }