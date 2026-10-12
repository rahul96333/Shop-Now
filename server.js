const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const ORDERS_FILE = path.join(__dirname, "orders.json");
const USERS_FILE = path.join(__dirname, "users.json");

const products = [
  // Electronics
  { id: 1,  name: "Wireless Headphones", price: 1999, category: "Electronics", img: "https://picsum.photos/id/1/300/200" },
  { id: 2,  name: "Smart Watch",         price: 2999, category: "Electronics", img: "https://picsum.photos/id/20/300/200" },
  { id: 7,  name: "Bluetooth Speaker",   price: 1299, category: "Electronics", img: "https://picsum.photos/id/96/300/200" },
  { id: 8,  name: "Gaming Mouse",        price: 899,  category: "Electronics", img: "https://picsum.photos/id/180/300/200" },
  { id: 9,  name: "Mechanical Keyboard", price: 2499, category: "Electronics", img: "https://picsum.photos/id/119/300/200" },
  { id: 10, name: "Power Bank",          price: 1499, category: "Electronics", img: "https://picsum.photos/id/48/300/200" },

  // Fashion
  { id: 3,  name: "Backpack",            price: 999,  category: "Fashion", img: "https://picsum.photos/id/30/300/200" },
  { id: 5,  name: "Running Shoes",       price: 1499, category: "Fashion", img: "https://picsum.photos/id/21/300/200" },
  { id: 11, name: "Sunglasses",          price: 799,  category: "Fashion", img: "https://picsum.photos/id/64/300/200" },
  { id: 12, name: "Leather Wallet",      price: 599,  category: "Fashion", img: "https://picsum.photos/id/106/300/200" },
  { id: 13, name: "Denim Jacket",        price: 1899, category: "Fashion", img: "https://picsum.photos/id/1011/300/200" },
  { id: 14, name: "Baseball Cap",        price: 399,  category: "Fashion", img: "https://picsum.photos/id/1025/300/200" },

  // Home
  { id: 4,  name: "Coffee Mug",          price: 299,  category: "Home", img: "https://picsum.photos/id/42/300/200" },
  { id: 6,  name: "Desk Lamp",           price: 699,  category: "Home", img: "https://picsum.photos/id/60/300/200" },
  { id: 15, name: "Ceramic Vase",        price: 899,  category: "Home", img: "https://picsum.photos/id/63/300/200" },
  { id: 16, name: "Wall Clock",          price: 749,  category: "Home", img: "https://picsum.photos/id/1080/300/200" },
  { id: 17, name: "Throw Pillow",        price: 449,  category: "Home", img: "https://picsum.photos/id/1060/300/200" },
  { id: 18, name: "Scented Candle",      price: 349,  category: "Home", img: "https://picsum.photos/id/312/300/200" },
];

function readJson(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
function makeToken(user) {
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Please log in first" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Session expired, please log in again" });
  }
}

app.get("/", (req, res) => {
  res.send("MyShop server is running. Try /api/products");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }
  const users = readJson(USERS_FILE);
  const cleanEmail = email.trim().toLowerCase();
  if (users.find(u => u.email === cleanEmail)) {
    return res.status(409).json({ error: "This email is already registered" });
  }
  const user = {
    id: users.length + 1,
    name: name.trim(),
    email: cleanEmail,
    passwordHash: bcrypt.hashSync(password, 10),
  };
  users.push(user);
  writeJson(USERS_FILE, users);
  res.status(201).json({ token: makeToken(user), user: { id: user.id, name: user.name, email: user.email } });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const users = readJson(USERS_FILE);
  const user = users.find(u => u.email === email.trim().toLowerCase());
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: "Wrong email or password" });
  }
  res.json({ token: makeToken(user), user: { id: user.id, name: user.name, email: user.email } });
});

app.post("/api/orders", requireAuth, (req, res) => {
  const { address, items } = req.body;
  if (!address || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Address and items are required" });
  }

  let total = 0;
  const orderItems = [];
  for (const item of items) {
    const product = products.find(p => p.id === item.id);
    const qty = Number(item.qty);
    if (!product || !Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({ error: "Invalid item in cart" });
    }
    total += product.price * qty;
    orderItems.push({ id: product.id, name: product.name, price: product.price, qty });
  }

  const orders = readJson(ORDERS_FILE);
  const order = {
    id: orders.length + 1,
    userId: req.user.id,
    name: req.user.name,
    address,
    items: orderItems,
    total,
    date: new Date().toLocaleString(),
  };
  orders.push(order);
  writeJson(ORDERS_FILE, orders);
  res.status(201).json(order);
});

app.get("/api/orders", requireAuth, (req, res) => {
  res.json(readJson(ORDERS_FILE).filter(o => o.userId === req.user.id));
});

// ADMIN: view all orders (simple password check)
app.get("/api/admin/orders", (req, res) => {
  const adminKey = req.headers["x-admin-key"];
  if (adminKey !== "mysecret123") {
    return res.status(403).json({ error: "Not authorized" });
  }
  res.json(readJson(ORDERS_FILE));
});

app.get("/api/admin/users", (req, res) => {
  const adminKey = req.headers["x-admin-key"];
  if (adminKey !== "mysecret123") {
    return res.status(403).json({ error: "Not authorized" });
  }
  const users = readJson(USERS_FILE).map(u => ({
    id: u.id, name: u.name, email: u.email
  }));
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));