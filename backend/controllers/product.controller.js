import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}); // find all products
		res.json({ products });
	} catch (error) {
		console.log("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_products");
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance
		featuredProducts = await Product.find({ isFeatured: true }).lean();

		if (!featuredProducts) {
			return res.status(404).json({ message: "No featured products found" });
		}

		// store in redis for future quick access

		await redis.set("featured_products", JSON.stringify(featuredProducts));

		res.json(featuredProducts);
	} catch (error) {
		console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, description, image, category, 
			// Printing Category //
			printPrice, sides, paperFinish, paperWeight, standardSizes, lamination, cornerType, layout,
			 // Signs Category //
			signsPrice, sizeOptions, material, printingType, finishingOptions, printingPreferences,
			// Branding Category //
			brandingPrice, size, colour, printBack, printFront } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
		}

		const product = await Product.create({
			name,
			description,
			image: cloudinaryResponse?.secure_url || "",
			category,
			// Printing Category //
			printPrice: printPrice || [],
			sides: sides || [],
			paperFinish: paperFinish || [],
			paperWeight: paperWeight || [],
			standardSizes: standardSizes || [],
			lamination: lamination || [],
			cornerType: cornerType || [],
			layout: layout || [],
			// Signs Category //
			signsPrice: signsPrice || [],
			sizeOptions: sizeOptions || [],
			material: material || [],
			printingType: printingType || [],
			finishingOptions: finishingOptions || [],
			printingPreferences: printingPreferences || [],
			// Branding Category //
			brandingPrice: brandingPrice || [],
			size: size || [],
			colour: colour || [],
			printBack: printBack || [],
			printFront: printFront || [],
		});

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					// Design Category // 
					// Printing Category // 
					printPrice: 1,
					sides: 1,
					paperFinish: 1,
					paperWeight: 1,
					standardSizes: 1,
					lamination: 1,
					cornerType: 1,
					layout: 1,
					// Signs Category //
					signsPrice: 1,
					sizeOptions: 1,
					material: 1,
					printingType: 1,
					finishingOptions: 1,
					printingPreferences: 1,
					// Branding Category // 
					brandingPrice: 1,
					size: 1, 
					colour: 1,
					printBack: 1,
					printFront: 1,
					//Paint Category // 
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedProductsCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("error in update cache function");
	}
}

import mongoose from "mongoose"; 

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const productUpdates = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product ID" });
	}

	try {
		const existingProduct = await Product.findById(id);
		if (!existingProduct) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		let cloudinaryResponse = null;
		if (productUpdates.image && productUpdates.image !== existingProduct.image) {
			if (existingProduct.image) {
				const publicId = existingProduct.image.split("/").pop().split(".")[0];
				await cloudinary.uploader.destroy(`products/${publicId}`);
			}

			cloudinaryResponse = await cloudinary.uploader.upload(productUpdates.image, {
				folder: "products",
			});
			productUpdates.image = cloudinaryResponse.secure_url;
		}

		// Ensure sizeOptions remains an array
		if (productUpdates.size && !Array.isArray(productUpdates.size)) {
			productUpdates.size = [];
		}

		const updatedProduct = await Product.findByIdAndUpdate(id, productUpdates, {
			new: true,
			runValidators: true,
		});

		if (updatedProduct.isFeatured) {
			await updateFeaturedProductsCache();
		}

		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		console.error("Error in updateProduct controller:", error.message);
		res.status(500).json({ success: false, message: "Server Error", error: error.message });
	}
};

export const getProductById = async (req, res) => {
	try {
	  const product = await Product.findById(req.params.id);
	  if (!product) {
		return res.status(404).json({ message: "Product not found" });
	  }
	  // Convert _id to string before sending to frontend
	  product._id = product._id.toString();  // or use .toString()
	  res.json(product); // Send the product to the frontend
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  };
  
  
