const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    cart: [{ productId: String, name: String, price: Number, quantity: Number }],
    address: String,
});

const User = mongoose.model("User", UserSchema);

// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// ✅ Signup Route
app.post("/api/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, cart: [], address: "" });
        await newUser.save();
        res.json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up" });
    }
});

// ✅ Login Route
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

// ✅ Add to Cart Route

// Add to Cart Route
app.post("/api/cart", verifyToken, async (req, res) => {
    try {
        const { productId, name, price, quantity } = req.body;

        console.log("Received productId:", productId); // ✅ Debugging line

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const existingProduct = user.cart.find(item => item.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            user.cart.push({ productId, name, price, quantity });
        }

        await user.save();
        res.json({ message: "Product added to cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
});



// ✅ Get Cart Data
app.get("/api/cart", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart data" });
    }
});

// ✅ Save Address Route
app.post("/api/address", verifyToken, async (req, res) => {
    try {
        const { address } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.address = address;
        await user.save();
        res.json({ message: "Address saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving address" });
    }
});

// ✅ Get Address Data
app.get("/api/address", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ address: user.address });
    } catch (error) {
        res.status(500).json({ message: "Error fetching address" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
