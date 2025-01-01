import mongoose, { Types } from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      Type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    categor: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],
  },
  { timestamps: true }
);

const SubCategoryModel = mongoose.model("subCategory", subCategorySchema);

export default SubCategoryModel;
