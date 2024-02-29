import mongoose, { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    title:{
        type:String,
        required:true,


    },
    description:{
        type: String,
        required:true,
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",


    },
    designersOffers:{
        type:[{type: Schema.Types.ObjectId,ref:'Offer'}],

    },
    expectedPrice:{
        type:String,
        enum:["25 - 50$","50 - 100$","100 - 250$","250 - 500$","500 - 1000$","1000 - 2500$","2500 -5000$","5000 - 10000$"],
        required:true,


    },
    expectedTime:{
        type:Number,
        required:true,
         min:1
    },
    status:{
      type:String,
      enum:["open","closed","completed"],
      default:"open",
    },
    file:{
        type:String,
        
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
    toJSON:{virtuals: true},
    toObject:{virtuals: true},
    timestamps: true,
  }
);
projectSchema.virtual('offer',{
  localField:'_id',
  foreignField:'project' ,
  ref : 'Offer'
})
const projectModel = mongoose.models.Project || model("Project", projectSchema);
export default projectModel;
