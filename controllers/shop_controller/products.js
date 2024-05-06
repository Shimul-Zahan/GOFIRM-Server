const Category = require("../../models/cat_model");
const UPLOAD_FOLDER = "./public/image";
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const Product = require("../../models/product_model");

//! -----------multer for image upload------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        if (file) {
            const fileExt = path.extname(file.originalname);
            const fileName =
                file.originalname
                    .replace(fileExt, "")
                    .toLowerCase()
                    .split(" ")
                    .join("-") +
                "-" +
                Date.now();
            console.log("🚀 ~ fileName:", fileName);
            cb(null, fileName + fileExt);
        }
    },
});

var upload = multer({
    storage: storage,
});

const addCategory = async (req, res) => {
    console.log('add cat route');
    try {
        const { name, subName, details } = req.body;
        console.log(name, subName, details);
        let image = null;
        if (req.file) {
            image = req.file.filename;
        }
        const newCategory = new Category({
            name,
            subName,
            details,
            image
        });
        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllCat = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// create products here
const addProducts = async (req, res) => {
    try {
        const {
            productName,
            selectedCat,
            price,
            region,
            quality,
            status,
            quantity,
            addedTime,
            orderNotes,
        } = req.body;

        let image = null;
        if (req.file) {
            image = req.file.filename;
        }

        const product = new Product({
            productName,
            selectedCat,
            price,
            region,
            quality,
            status,
            quantity,
            addedTime,
            orderNotes,
            image
        });
        await product.save();
        console.log(product);
        res.status(201).json({ message: 'Product created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedProduct = req.body;
        // Update the product in the database
        const product = await Product.findByIdAndUpdate(productId, updatedProduct);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const search = async (req, res) => {
    try {
        const searchQuery = req.query.search;
        const regex = new RegExp(searchQuery, 'i');
        const products = await Product.find({
            $or: [
                { productName: regex },
                { selectedCat: regex },
                { region: regex },
                { quality: regex },
                { status: regex },
                { quantity: regex },
                { orderNotes: regex },
                { isTopRated: regex },
                { isTopSelling: regex }
            ]
        });
        res.json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const countProductsByCategory = async (req, res) => {
    try {
        // Aggregate pipeline to group products by category and count them
        const result = await Product.aggregate([
            {
                $group: {
                    _id: '$selectedCat', // Group by category
                    count: { $sum: 1 } // Count documents in each group
                }
            }
        ]);

        const counts = result.map(category => ({ name: category._id, count: category.count }));
        console.log(counts);

        res.json(counts);
    } catch (error) {
        console.error('Error counting products by category:', error);
    }
};


module.exports = { getAllProducts, addCategory, upload, getAllCat, addProducts, getAllProducts, updateProduct, deleteProduct, search, countProductsByCategory };