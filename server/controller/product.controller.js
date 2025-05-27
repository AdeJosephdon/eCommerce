import Product from "../models/product.model.js";
import mongoose from "mongoose";

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(404).json({ success: false, message: "Products not found" });
  }
};

const createProduct = async (req, res) => {
  // Done
  const product = req.body;

  if (
    !product.title ||
    !product.price ||
    !product.description ||
    !product.category ||
    !product.image
  ) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  // console.log("Incoming Product:", req.body);

  const newProduct = new Product(product);

  // console.log(newProduct);
  // console.log("New Product:", newProduct);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const editAProduct = async (req, res) => {
  // console.log(req);

  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, message: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default { getAllProducts, editAProduct, createProduct, deleteProduct };
