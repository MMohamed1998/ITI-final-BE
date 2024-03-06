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
      type:String,
      enum:["flats","hotels","offices","companies","restaurants"],
      default:"flats",
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
        type:Schema.Types.ObjectId,
        ref : 'User' // Reference the User model
    },
    updatedBy:{
        type:Schema.Types.ObjectId,
        ref : 'User' // Reference the User model
    },
    skills:{
      type:[String],
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
  foreignField:'project',
  ref : 'Offer'
});

// Populate the createdBy and updatedBy fields with user data
projectSchema.pre(/^find/, function(next) {
  this.populate('createdBy').populate('category');
  next();
});

const projectModel = mongoose.models.Project || model("Project", projectSchema);
export default projectModel;
