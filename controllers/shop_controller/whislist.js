const WhisList = require("../../models/whislist_models");

const add_to_whisList = async (req, res) => {
    try {
        const { _id, productName, selectedCat, price, region, quality, status, quantity, addedTime, orderNotes, image, email } = req.body;
        const newCartItem = new WhisList({
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
        res.json({ message: 'Item added to the whislist successfully', newCartItem });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { add_to_whisList }