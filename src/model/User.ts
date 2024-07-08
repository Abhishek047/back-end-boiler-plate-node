import { Schema, model } from "mongoose";
import { UserI } from "./interface";
import { MANAGER, USER, ADMIN, OWNER } from "../utils/constants";

// make changes in interface too
const schema = new Schema<UserI>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: { type: String, required: false },
    email: { type: String, required: true },
    number: { type: String, required: false },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "company",
      required: function () {
        return this.userType !== OWNER;
      },
    },
    userType: {
      type: String,
      enum: [MANAGER, USER, ADMIN, OWNER],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Users = model("users", schema);
