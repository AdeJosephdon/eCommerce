import Rating from "../models/rating.model.js";
import mongoose from "mongoose";

export const getAllRatings = async (req, res) => {
  try {
    const Ratings = await Rating.find();
    res.status(200).json({ success: true, data: Ratings });
  } catch (error) {
    console.log("error in fetching Ratings:", error.message);
    res.status(404).json({ success: false, message: "Ratings not found" });
  }
};

export const createRating = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id;

    if (!rating) {
      return res
        .status(403)
        .json({ success: false, message: "Missing rating" });
    }
    if (!productId) {
      return res
        .status(403)
        .json({ success: false, message: "Missing Product ID" });
    }

    const existing = await Rating.findOne({ user: userId, product: productId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "You already rated this product." });
    }

    const newRating = new Rating({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    await newRating.save();
    res.status(201).json({ success: true, rating: newRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRatingStats = async (req, res) => {
  const { productId } = req.params;

  try {
    const stats = await Rating.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: "$product",
          avgRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats.length > 0 ? stats[0] : { avgRating: 0, totalRatings: 0 },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
