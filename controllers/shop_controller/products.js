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

module.exports = { getAllProducts, addCategory, upload, getAllCat, addProducts, getAllProducts };