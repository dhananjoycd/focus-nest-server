const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/users");
const { connectDB } = require("./src/server/config");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const moneyRoutes = require("./src/routes/money");

// Load environment variables
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://focus-nest-bd.web.app",
      "https://focus-nest-bd.firebaseapp.com",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/money", moneyRoutes);

// start Server
connectDB().then(() => {
  app.get("/", (req, res) => {
    res.send("Server is running Now!");
  });

  app.listen(port, () => {
    console.log(`sever bhaiya is ruuniing on the port ${port}`);
  });
});
