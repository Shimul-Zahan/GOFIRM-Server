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
const get_white_by_user = async (req, res) => {
    try {
        const userEmail = req.query.email;
        const userCartItems = await WhisList.find({ email: userEmail });

        res.json(userCartItems);
    } catch (error) {
        console.error('Error fetching user cart items:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteWhiteItem = async (req, res) => {
    const { itemId } = req.params;

    try {
        // Delete the white item by ID
        await WhisList.findByIdAndDelete(itemId);
        res.status(200).json({ message: 'White item deleted successfully' });
    } catch (error) {
        console.error('Error deleting white item:', error);
        res.status(500).json({ error: 'An error occurred while deleting the white item' });
    }
};

module.exports = { add_to_whisList, get_white_by_user, deleteWhiteItem }