import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import productRouter from "./routes/product.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import ratingRouter from "./routes/rating.routes.js";
import cartRouter from "./routes/cart.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const app = express();

dotenv.config();

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.json({ message: "Hello from the backend!" });
// });

app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);

// app.get("/api/hello", (req, res) => {
//   res.json({ message: "Hello from the backend!" });
// });

if (process.env.NODE_ENV === "production") {
  console.log("Production worked");
  const frontendBuildPath = path.join(__dirname, "..", "client", "build");
  console.log("Production inside worked");
  app.use(express.static(frontendBuildPath));
  console.log("frontendBuildPath: ", frontendBuildPath);

  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(frontendBuildPath, "index.html"));
  // });

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MongoDB
// OKHtXhkzw6kZWpujs
