const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const sendEmail = require("../Mail/sendMail"); // Import the sendEmail function
const User = require("../models/User"); // Ensure this matches your actual file structure

const router = express.Router();

// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress = null, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress, // Can be null
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });

    console.log(`Checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id).populate("user");

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      // Update checkout payment details
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();

      // Fetch customer details
      const customer = await User.findById(checkout.user._id);

      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      // Handle missing shipping address gracefully
      const shippingDetails = checkout.shippingAddress
        ? `
          <h2>Delivery Address</h2>
          <p>Recipient Name: <strong>${checkout.shippingAddress.recipientName}</strong></p>
          <p>Address: <strong>${checkout.shippingAddress.address}</strong></p>
          <p>City: <strong>${checkout.shippingAddress.city}</strong></p>
          <p>Postal Code: <strong>${checkout.shippingAddress.postalCode}</strong></p>
          <p>Country: <strong>${checkout.shippingAddress.country}</strong></p>
        `
        : "<h2>No Shipping Address Provided</h2>";

      const email1Subject = `New Order Confirmation - Order ID: ${checkout._id}`;

      // Function to format and filter print options correctly
      const formatPrintOptions = (printOptions) => {
        if (!printOptions || typeof printOptions !== "object") return "No options selected";

        return Object.entries(printOptions)
          .filter(([, value]) => {
            if (Array.isArray(value)) return value.length > 0; // Ensure array is not empty
            if (typeof value === "object") return Object.values(value).some((v) => v); // Check if object has any truthy value
            return value && value !== ""; // Ensure value is not empty or falsy
          })
          .map(([key, value]) => {
            // Convert camelCase or snake_case to readable format
            const formattedKey = key
              .replace(/([A-Z])/g, " $1") // Space before uppercase letters (camelCase)
              .replace(/_/g, " ") // Replace underscores with spaces (snake_case)
              .trim()
              .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter

            // Format values for readability
            if (Array.isArray(value)) return `${formattedKey}: ${value.join(", ")}`;
            if (typeof value === "object") return `${formattedKey}: ${JSON.stringify(value)}`;
            return `${formattedKey}: ${value}`;
          })
          .join("<br>"); // Separate options with line breaks
      };

      // Extract and format print options for each item
      const printOptionsList = checkout.checkoutItems
        .map((item, index) => {
          const formattedOptions = formatPrintOptions(item.printOptions);
          return formattedOptions !== "No options selected"
            ? `<p><strong>Item ${index + 1}:</strong><br>${formattedOptions}</p>`
            : "";
        })
        .filter(Boolean) // Remove empty items
        .join("");

      // Construct email content
      const email1Html = `
        <h1>New Order Received</h1>
        <p>Order ID: <strong>${checkout._id}</strong></p>
        <p>Total Amount: <strong>R${checkout.totalPrice}</strong></p>
        <p>Payment Method: <strong>PayPal</strong></p>
        ${printOptionsList ? `<h2>Print Options:</h2> ${printOptionsList}` : ""}
      `;

      await sendEmail(
        "vanderholtzpromotions@gmail.com",
        email1Subject,
        "",
        email1Html
      );

      // Email 2: Customer
      const email2Subject = `Thank You for Your Order - Order ID: ${checkout._id}`;
      const email2Html = `
        <h1>Thank You for Your Order</h1>
        <p>Your order has been successfully placed.</p>
        <p>Order ID: <strong>${checkout._id}</strong></p>
        <p>Total Amount: <strong>R${checkout.totalPrice}</strong></p>
        <p>Please forward your images to <strong>vanderholtzpromotions@gmail.com</strong>.</p>
      `;
      await sendEmail(customer.email, email2Subject, "", email2Html);

      // Dummy address check
      const dummyAddress = {
        recipientName: "John Doe",  // Dummy name
        address: "123 Dummy St",    // Dummy address
        city: "Sample City",        // Dummy city
        postalCode: "12345",        // Dummy postal code
        country: "Country",         // Dummy country
        phone: "+1 234 567 8901",   // Dummy phone
      };

      const isDummyAddress = (shippingAddress) => {
        return (
          shippingAddress.recipientName === dummyAddress.recipientName &&
          shippingAddress.address === dummyAddress.address &&
          shippingAddress.city === dummyAddress.city &&
          shippingAddress.postalCode === dummyAddress.postalCode &&
          shippingAddress.country === dummyAddress.country &&
          shippingAddress.phone === dummyAddress.phone
        );
      };

      if (checkout.shippingAddress) {
        // Check if the shipping address is a dummy address
        if (isDummyAddress(checkout.shippingAddress)) {
          console.log("Dummy address detected. Email not sent.");
        } else {
          // Proceed to send the email
          const collectionDate = new Date();
          collectionDate.setDate(collectionDate.getDate() + 5); // Collection date is 5 days from now

          const email3Subject = `Order Details - Order ID: ${checkout._id}`;
          const email3Html = `
            <h1>Order Details</h1>
            <h2>Account Details</h2>
            <p>Customer Name: <strong>George Holtzhausen</strong></p>
            <p>Account Number: <strong>VDH006</strong></p>

            <h2>Collection Address</h2>
            <p>Type: <strong>Business</strong></p>
            <p>Company: <strong>Van Der Holtz Promotions Pty (Ltd.)</strong></p>
            <p>Street Address: <strong>21B Blue Street</strong></p>
            <p>Local Area: <strong>Isitebe</strong></p>
            <p>City/Town: <strong>Mandeni</strong></p>
            <p>Code: <strong>4490</strong></p>
            <p>Zone: <strong>KZN</strong></p>
            <p>Country: <strong>South Africa</strong></p>

            <h2>Delivery Address</h2>
            <p>Recipient Name: <strong>${checkout.shippingAddress.recipientName}</strong></p>
            <p>Address: <strong>${checkout.shippingAddress.address}</strong></p>
            <p>City: <strong>${checkout.shippingAddress.city}</strong></p>
            <p>Postal Code: <strong>${checkout.shippingAddress.postalCode}</strong></p>
            <p>Country: <strong>${checkout.shippingAddress.country}</strong></p>

            <h2>Delivery Contact</h2>
            <p>Name: <strong>${checkout.shippingAddress.recipientName}</strong></p>
            <p>Phone: <strong>${checkout.shippingAddress.phone}</strong></p>
            <p>Email: <strong>${customer.email}</strong></p>

            <h2>Parcel Information</h2>
            <p>Number of Parcels: <strong>${checkout.checkoutItems.length}</strong></p>
            <p>Dimensions: <strong>${checkout.checkoutItems[0].dimensions}</strong></p>
            <p>Weight: <strong>${checkout.checkoutItems[0].weight}</strong></p>
            <p>Parcel Category: <strong>Standard</strong></p>

            <h2>Collection Date</h2>
            <p>Date: <strong>${collectionDate.toDateString()}</strong></p>
          `;

          await sendEmail("support@thecourierguy.co.za", email3Subject, "", email3Html);
        }
      } else {
        console.log("Shipping address is missing. Email not sent.");
      }

      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid Payment Status" });
    }
  } catch (error) {
    console.error("Error updating checkout payment status:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // Create final order based on the checkout details
      console.log(checkout.checkoutItems);

      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress || {},
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        dimensions: checkout.dimensions,
        weight: checkout.weight,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      // Mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      // Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout already finalized" });
    } else {
      res.status(400).json({ message: "Checkout is not paid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;