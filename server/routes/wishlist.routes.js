import express from "express";
import userAuth from "../middleware/user.auth.js";
import {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
  deleteAllWishlistProducts,
} from "../controller/wishlist.controller.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add-to-wishlist", userAuth, addToWishlist);
wishlistRouter.post("/remove-from-wishlist", userAuth, removeFromWishlist);
wishlistRouter.post(
  "/delete-all-wishlist-products",
  userAuth,
  deleteAllWishlistProducts
);

wishlistRouter.get("/get-user-wishlist", userAuth, getUserWishlist);

export default wishlistRouter;
