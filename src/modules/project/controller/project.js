import projectModel from "../../../../DB/model/Project.model.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";




export const getProjects = asyncHandler(async (req, res, next) => {
  const projects =await projectModel.find().populate([{
    path: 'offer'
}])
  res.status(200).json({ message: `done`, data:projects,success:true });
});

export const getUserProjects = asyncHandler(async (req, res, next) => {
  const userId = req.user;
  const projects = await projectModel.find({createdBy:userId }).populate([{
    path: 'offer'
}]); 
  if (!projects || projects.length === 0) {
    return next(new Error("No Projects Found", { cause: 400 }));

  }
  res.status(200).json({ message: `User Projects`, data: projects, success: true });
});

export const addProject = asyncHandler(async (req, res, next) => {
  
   const {title,description,expectedPrice,expectedTime,category}=req.body
    const userId = req.user;
    const user = await userModel.findById(userId)
    if (!user) {
      return next(new Error("No User found with this Id!", { cause: 400 }));
    }
    if(!user.role=="User"){
      return next(new Error("you are designer you can't add project", { cause: 400 }));

    }
    const project = await projectModel.create({
      title,
      description,
      expectedPrice,
      expectedTime,
      category,
      createdBy:userId
    });
    res.status(200).json({message: "User created successfully!",data:project,success:true });
  });

  export const updateProject = asyncHandler(async (req, res, next) => {

    const {title,description,expectedPrice,expectedTime,category}=req.body
    const userId =req.user
    const projectId=req.params.projectId
    const project =await projectModel.findById(projectId)
    if(!project){
        return next(new Error('project not found',{code:404}))
    }
    
    if(!(project.createdBy== userId)){
      return next(new Error("You don't have permission to perform this action." ,{code:404}))

    }
    
    const newProject=await projectModel.findByIdAndUpdate(project._id,{
      title,
      description,
      expectedPrice,
      expectedTime,
      category,
        updatedBy : userId
    },{new:true})
    return res.status(200).json({message:"done ",newProject,success:true} )
    
   });


   export const deleteProject = asyncHandler(async (req, res, next) => {

    const userId =req.user
    const projectId=req.params.projectId
    const project =await projectModel.findById(projectId)
    if(!project){
        return next(new Error('project not found',{code:404}))
    }
    if(!(project.createdBy== userId)){
      return next(new Error("You don't have permission to perform this action." ,{code:404}))

    }
    
    await projectModel.findByIdAndDelete(project._id)
    return res.status(200).json({message:"deleted successfully ",success:true} )
    
   });