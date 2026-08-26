const express = require("express");
const mongoose = require("mongoose");
const categoryRoutes = require('./routes/category')
const brandRoutes = require('./routes/brand')
const productRoutes = require('./routes/product')
const customerRoutes = require('./routes/customer')
const authRoutes = require('./routes/auth')

const app = express();
const port = 3000;
const cors = require("cors");

// Parse JSON body
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) =>
    res.send("Server running new"));

// Mount auth router FIRST (before other routes)
app.use("/auth", authRoutes);

// Mount category router
app.use("/category", categoryRoutes);
app.use("/brand", brandRoutes);
app.use("/product", productRoutes);
app.use("/customer", customerRoutes);



// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      dbName: "EcommerceStore"
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// Start server
app.listen(port, () => console.log("Server running on port", port));