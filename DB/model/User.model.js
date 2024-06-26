import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    userName: {
      type: String,
      required: [true, "userName is required"],
      minLength: [2, "minimum length 2 char"],
      maxLength: [20, "max length 2 char"],
    },
    email: {
      type: String,
      unique: [true, "email must be unique value"],
      required: [true, "userName is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    city:{
      type :String ,
    },
    about:{
      type :String
    },
    role: {
      type: String,
      enum: ["User", "Admin", "Designer"],
      default: "User",

    },

    status: {
      type: String,
      enum: ["offline", "blocked", "online"],
      default: "offline",

    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    urlToUpdate: String,
    image: String,
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
    DOB: String,
    forgetCode: {
      type: String,
      default: null,
    },
    changePasswordTime: {
      type: Date,
    },
    rate:{
      type:Number,
      min:[1],
      max:[5]
    },
    notification:{
      type:[{}]
    }
  },
  {
    timestamps: true,
  }
);

// userSchema.post("init", function (doc) {
//   doc.image = process.env.HOST + doc.image;
// });
const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
