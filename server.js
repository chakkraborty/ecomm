const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
const userRoutes = require("./backend/routes/userRoutes");
const productRoutes = require("./backend/routes/productRoutes");
const cartRoutes = require("./backend/routes/cartRoutes");
const connectDB = require("./backend/config/db");
const addressRoutes = require("./backend/routes/addressRoutes");

dotenv.config();

const mongoose = require("mongoose");
//const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use("/api/", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", addressRoutes);
app.listen(PORT, console.log(`server is running on port no. ${PORT}`));
connectDB();
app.get("/", (req, res) => {
  res.send("api is running here...");
});
