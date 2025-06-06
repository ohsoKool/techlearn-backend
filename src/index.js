import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/product.model.js";

dotenv.config();
const app = express();
app.use(express.json());
app.get("/ping", (req, res) => {
  res.sendStatus(200);
});
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {}
});
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product Not found" });
    }
    const updatedProduct = await Product.findById(id);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const db = await mongoose.connect(`${process.env.Mongodb_URL}`);
try {
  if (db) console.log("Successfully connected to the database");
} catch (error) {
  console.log("Error occured", error);
}
