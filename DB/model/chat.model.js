import mongoose, { model, Schema, Types } from "mongoose";
const chatSchema = new Schema(
  {
    sender: { type: Types.ObjectId, ref: "User", required: true },
    receiver: { type: Types.ObjectId, ref: "User", required: true },
    messages: [
      {
        from: { type: Types.ObjectId, ref: "User", required: true },
        to: { type: Types.ObjectId, ref: "User", required: true },

        message: {
          type: String,
          required: true,
        },
      },
    ],
    fileUrl:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);
const chatModel = mongoose.models.Chat || model("Chat", chatSchema);
export default chatModel;
