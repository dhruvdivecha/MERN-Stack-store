import Product from "../models/Product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Products not found", error: error.message });
    }
};

export const updateProduct =  async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        res.status(404).json({ success: false, message: "Product not found", error: error.message });
    }
};

export const createProduct =  async (req, res) => {
    const product = req.body; // product is the data that we are sending from the frontend

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Product creation failed", error: error.message });
    }
};

export const deleteProduct =  async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Product deletion failed", error: error.message });
    }
};