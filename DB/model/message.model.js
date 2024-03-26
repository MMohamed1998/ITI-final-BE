import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
messageSchema.pre(/^find/, function(next) {
  this.populate('senderId')
  next();
});
messageSchema.pre(/^find/, function(next) {
  this.populate('receiverId')
  next();
});
const messageModel = mongoose.models.Message || model("Message", messageSchema);
export default messageModel;
