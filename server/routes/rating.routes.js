import express from "express";
import userAuth from "../middleware/user.auth.js";
import {
  createRating,
  getRatingStats,
  getAllRatings,
} from "./../controller/rating.controller.js";

const ratingRouter = express.Router();

ratingRouter.post("/rate", userAuth, createRating);
ratingRouter.get("/all-ratings", getAllRatings);
ratingRouter.get("/stats/:productId", getRatingStats);

export default ratingRouter;
