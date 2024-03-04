import mongoose, { Schema, model } from "mongoose";

const offerSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId, 
      ref: "Project" ,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    file: {
      type: String,
    },
    createdBy:{
      type:Schema.Types.ObjectId , 
      ref : 'User'
    },
    updatedBy:{
      type:Schema.Types.ObjectId , 
      ref : 'User'
    }
  },
  {
    timestamps: true,
  }
);

offerSchema.pre(/^find/, function(next) {
  this.populate('createdBy')
  next();
});
const offerModel = mongoose.models.Offer || model("Offer", offerSchema);
export default offerModel;
