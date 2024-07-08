import { Schema, model } from "mongoose";
import { CompanyI } from "./interface";
// make changes in interface too

const schema = new Schema<CompanyI>(
  {
    name: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    userLimit: {
      type: Number,
      default: 100,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Company = model("company", schema);
