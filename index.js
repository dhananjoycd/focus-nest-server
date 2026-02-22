const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/users");
const { connectDB } = require("./src/server/config");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const moneyRoutes = require("./src/routes/money");
const { login } = require("./src/middleware/authController");

// Load environment variables
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:5173",
    "https://focus-nest-bd.web.app",
    "https://focus-nest-bd.firebaseapp.com",
    "https://facebooooook.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const dbReady = connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(async (req, res, next) => {
  try {
    await dbReady;
    next();
  } catch (error) {
    next(error);
  }
});

app.options("*", cors(corsOptions));

// Routes
app.post("/jwt", login);
app.use("/api/users", userRoutes);
app.use("/api/money", moneyRoutes);
app.get("/", (req, res) => {
  res.send("Server is running Now!");
});

module.exports = app;

if (require.main === module) {
  dbReady
    .then(() => {
      app.listen(port, () => {
        console.log(`sever bhaiya is ruuniing on the port ${port}`);
      });
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
      process.exit(1);
    });
}
