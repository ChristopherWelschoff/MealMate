import mongoose from "mongoose";
import "./Category";

const { Schema } = mongoose;

const recipeSchema = new Schema(
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
      type: [Schema.Types.ObjectId],
      ref: "Category",
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

const Recipe =
  mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema, "recipes");

export default Recipe;
