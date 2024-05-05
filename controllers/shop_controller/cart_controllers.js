const Cart = require("../../models/cart_collection");

const add_to_cart = async (req, res) => {
    try {
        const { _id, productName, selectedCat, price, region, quality, status, quantity, addedTime, orderNotes, image, email } = req.body;

        const newCartItem = new Cart({
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
        res.json({ message: 'Item added to the cart successfully', newCartItem });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const get_cart_by_user = async (req, res) => {
    try {
        const userEmail = req.query.email;
        const userCartItems = await Cart.find({ email: userEmail });

        res.json(userCartItems);
    } catch (error) {
        console.error('Error fetching user cart items:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteCartItem = async (req, res) => {
    try {
        const productId = req.params.productId;
        console.log(productId);
        const deletedItem = await Cart.findOneAndDelete({ _id: productId });

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found in the cart" });
        }

        res.json({ message: "Item removed from the cart successfully", deletedItem });
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { add_to_cart, get_cart_by_user, deleteCartItem }