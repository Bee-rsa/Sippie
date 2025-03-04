<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscribeRoute");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

const app = express();

// Increase the payload size limit to 50MB
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME TO RABBIT API!");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);

// Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
=======
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import paypal from "paypal-rest-sdk";
import cors from "cors";
import nodemailer from "nodemailer";

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

// PayPal configuration
paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID || "AdP6gFoFOyNYdmrbDHkcO2mVeARd5SPGibVrrCTqEocpLUgjbhooLUClgU7vovcV2em-Ey-3gGq18Quq",
  client_secret: process.env.PAYPAL_CLIENT_SECRET || "EMjL66hsdS3wt5tqK4Cuq7peR_AMdDmDP3_u9jergS08AH3U5Yef4o_fg5KDDqctF31Fzyysa7Sg3-gK",
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// PayPal payment route
app.post("/payment", async (req, res) => {
  try {
    const { totalAmount } = req.body;

    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      throw new Error("Invalid totalAmount. It must be a positive number.");
    }

    let create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "https://vdh-promotions.onrender.com/success-payment",
        cancel_url: "https://vdh-promotions.onrender.com/failed",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Printing Service",
                sku: "PRINT001",
                price: totalAmount.toFixed(2),
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "Payment for printing services.",
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.error("PayPal Error:", error);
        res.status(500).json({ error: "Failed to create PayPal payment", details: error.response });
      } else {
        console.log("PayPal Payment Created:", payment);
        console.log("Approval URL:", payment.links[1].href);
        res.json(payment);
      }
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// PayPal success-payment route
app.get("/success-payment", async (req, res) => {
  try {
    const { paymentId, token, PayerID } = req.query;

    if (!paymentId || !PayerID) {
      console.error("Missing paymentId or PayerID");
      return res.redirect("https://vdh-promotions.onrender.com/failed");
    }

    const execute_payment_json = {
      payer_id: PayerID,
    };

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
      if (error) {
        console.error("PayPal Error - Execute Payment:", error);
        return res.redirect("https://vdh-promotions.onrender.com/failed");
      } else {
        console.log("Payment Executed Successfully:", JSON.stringify(payment));

        const customerEmail = payment.payer.payer_info.email;
        const orderId = payment.transactions[0].invoice_number || "N/A";

        // Validate customer email
        const isValidEmail = (email) => {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
        };

        if (!isValidEmail(customerEmail)) {
          console.error("Invalid customer email:", customerEmail);
          return res.redirect("https://vdh-promotions.onrender.com/failed");
        }

        // Send confirmation emails
        try {
          await sendEmail(
            customerEmail,
            "Payment Confirmation",
            `Thank you for your payment! Your order ID is ${orderId}.`,
            `<p>Thank you for your payment! Your order ID is <strong>${orderId}</strong>.</p>`
          );

          await sendEmail(
            "cleaverbrendan100@gmail.com",
            "New Payment Received",
            `A new payment has been received for order ID ${orderId}.`,
            `<p>A new payment has been received for order ID <strong>${orderId}</strong>.</p>`
          );

          await sendEmail(
            customerEmail,
            "Shipping Confirmation",
            `Your order (ID: ${orderId}) has been shipped.`,
            `<p>Your order (ID: <strong>${orderId}</strong>) has been shipped.</p>`
          );

          console.log("All emails sent successfully!");
        } catch (emailError) {
          console.error("Error sending emails:", emailError);
        }

        return res.redirect("https://vdh-promotions.onrender.com/success");
      }
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.redirect("https://vdh-promotions.onrender.com/failed");
  }
});

// PayPal failed payment route
app.get("/failed", async (req, res) => {
  return res.redirect("https://vdh-promotions.onrender.com/failed");
});

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
>>>>>>> 1342fe2573a7b00321d7aaca583e3aa30f571559
});