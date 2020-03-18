/**
 * Title: models/employee.model.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// define Model for metadata collection
export const GFS = mongoose.model(
  "GFS",
  new mongoose.Schema({}, { static: false }),
  "images.files"
);

const employeeSchema = new mongoose.Schema(
  {
    empid: {
      type: String,
      unique: true
    },
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true
    },
    groups: [String],
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GFS"
    },
    credential: {
      password: String
    }
  },
  { versionKey: false }
);

employeeSchema.plugin(mongoosePaginate);

export const Employee = mongoose.model("Employee", employeeSchema);
