import express from "express";
import {
	createProduct,
	deleteProduct,
	updateProduct,
	getAllProducts,
	getProductById,
	getFeaturedProducts,
	getProductsByCategory,
	getRecommendedProducts,
	toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.put("/products/:id", async (req, res) => {
	try {
	  const productId = req.params.id;
	  const updatedData = req.body;
  
	  const updatedProduct = await Product.findByIdAndUpdate(
		productId,
		updatedData,
		{ new: true }
	  );
  
	  if (!updatedProduct) {
		return res.status(404).json({ message: "Product not found" });
	  }
  
	  res.status(200).json(updatedProduct);
	} catch (error) {
	  console.error("Error updating product:", error);
	  res.status(500).json({ message: "Internal server error" });
	}
  });
router.get('/:id', getProductById);
router.get("/category/:category", getProductsByCategory); // Pagination supported here
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;