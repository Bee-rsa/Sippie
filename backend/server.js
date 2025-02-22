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
  service: "gmail", // Use Gmail or another service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to, // Recipient address
      subject, // Email subject
      text, // Plain text body
      html, // HTML body
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
        return_url: "https://vdh-promotions.onrender.com/success-payment",
        cancel_url: "https://vdh-promotions.onrender.com/failed",
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
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.error("PayPal Error:", error);
        res.status(500).json({ error: "Failed to create PayPal payment", details: error.response });
      } else {
        console.log("PayPal Payment Created:", payment);
        console.log("Approval URL:", payment.links[1].href); // Log the approval URL
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

    // Execute the payment
    const execute_payment_json = {
      payer_id: PayerID,
    };

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
      if (error) {
        console.error("PayPal Error - Execute Payment:", error);
        return res.redirect("https://vdh-promotions.onrender.com/failed");
      } else {
        console.log("Payment Executed Successfully:", JSON.stringify(payment));

        // Extract customer email and order details from the payment object
        const customerEmail = payment.payer.payer_info.email;
        const orderId = payment.transactions[0].invoice_number || "N/A"; // Use invoice number or a placeholder

        // Send confirmation emails
        try {
          // Email 1: Confirmation email to the customer
          await sendEmail(
            customerEmail,
            "Payment Confirmation",
            `Thank you for your payment! Your order ID is ${orderId}.`,
            `<p>Thank you for your payment! Your order ID is <strong>${orderId}</strong>.</p>`
          );

          // Email 2: Notification email to the admin
          await sendEmail(
            "cleaverbrendan100@gmail.com",
            "New Payment Received",
            `A new payment has been received for order ID ${orderId}.`,
            `<p>A new payment has been received for order ID <strong>${orderId}</strong>.</p>`
          );

          // Email 3: Shipping confirmation email to the customer
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

        // Redirect to the frontend success page
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
});