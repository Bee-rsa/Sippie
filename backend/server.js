import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import paypal from "paypal-rest-sdk";
import cors from "cors";


import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

paypal.configure({
    "mode":'sandbox',
    "client_id": "AdP6gFoFOyNYdmrbDHkcO2mVeARd5SPGibVrrCTqEocpLUgjbhooLUClgU7vovcV2em-Ey-3gGq18Quq",
    "client_secret": 'EMjL66hsdS3wt5tqK4Cuq7peR_AMdDmDP3_u9jergS08AH3U5Yef4o_fg5KDDqctF31Fzyysa7Sg3-gK',
});

app.post("/payment", async (req, res) => {
	try {
	  const { totalAmount } = req.body; // Get the dynamic totalAmount from the frontend
  
	  // Validate the totalAmount
	  if (typeof totalAmount !== "number" || totalAmount <= 0) {
		throw new Error("Invalid totalAmount. It must be a positive number.");
	  }
  
	  // Create the payment JSON dynamically
	  let create_payment_json = {
		intent: "sale",
		payer: {
		  payment_method: "paypal",
		},
		redirect_urls: {
		  return_url: "http://localhost:5000/success-payment",
		  cancel_url: "http://localhost:5000/failed",
		},
		transactions: [
		  {
			item_list: {
			  items: [
				{
				  name: "Printing Service", // Replace with your item name
				  sku: "PRINT001", // Replace with your SKU
				  price: totalAmount.toFixed(2), // Use the dynamic totalAmount
				  currency: "USD", // Change currency if needed
				  quantity: 1,
				},
			  ],
			},
			amount: {
			  currency: "USD", // Change currency if needed
			  total: totalAmount.toFixed(2), // Use the dynamic totalAmount
			},
			description: "Payment for printing services.",
		  },
		],
	  };
  
	  // Create PayPal payment
	  await paypal.payment.create(create_payment_json, function (error, payment) {
		if (error) {
		  console.error("PayPal Error:", error);
		  res.status(500).json({ error: "Failed to create PayPal payment", details: error.response });
		} else {
		  console.log("PayPal Payment Created:", payment);
		  res.json(payment);
		}
	  });
	} catch (error) {
	  console.error("Server Error:", error);
	  res.status(500).json({ error: "Internal server error", details: error.message });
	}
  });


  app.get("/success-payment", async (req, res) => {
  try {
    const { PayerID: payerId, paymentId } = req.query;

    if (!payerId || !paymentId) {
      console.error("Missing paymentId or PayerID");
      return res.redirect("/http://localhost:5173/failed");
    }

    // Retrieve the payment details
    paypal.payment.get(paymentId, function (error, payment) {
      if (error) {
        console.error("PayPal Error - Fetch Payment:", error);
        return res.redirect("http://localhost:5173/failed");
      }

      const totalAmount = payment.transactions[0].amount.total; // Fetch correct total

      const execute_payment_json = {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: totalAmount,
            },
            description: "Payment for printing services.",
          },
        ],
      };

      // Execute the payment
      paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
          console.error("PayPal Error - Execute Payment:", error);
          return res.redirect("http://localhost:5173/failed");
        } else {
          console.log("Payment Executed Successfully:", JSON.stringify(payment));

          // Redirect back to frontend success page with confirmation
          return res.redirect(`http://localhost:5173/success-payment`);
        }
      });
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.redirect("http://localhost:5173/failed");
  }
});



app.get('/failed', async (req, res) => {

    return res.redirect("http://localhost:5173/failed")
})


const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});

