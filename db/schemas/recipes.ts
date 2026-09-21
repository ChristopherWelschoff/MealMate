import mongoose from "mongoose";
import Category from "./categories";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    ingredients: {
      type: [String],
      required: true,
    },

    instructions: {
      type: [String],
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },

    imageUrl: {
      type: String,
      required: false,
      trim: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  },
);

delete mongoose.models.Recipe;

const Recipe = mongoose.model("Recipe", recipeSchema, "recipes");

export default Recipe;
