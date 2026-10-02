import mongoose from "mongoose";
import "./Recipe";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: "Recipe",
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;
