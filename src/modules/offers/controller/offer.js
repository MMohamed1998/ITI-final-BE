import offerModel from "../../../../DB/model/offer.model.js";
import projectModel from "../../../../DB/model/Project.model.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const getOffer = asyncHandler(async (req, res, next) => {
  const offerId = req.params.offerId;
  
  const offers = await offerModel
    .findOne({ _id: offerId })
    .populate("createdBy").populate([
      {
        path: "project",
      },
    ]);
  res.status(200).json({ message: `done`, data: offers, success: true });
});
export const getProjectOffer = asyncHandler(async (req, res, next) => {
  const projectId = req.params.projectId;
  const offers = await offerModel
    .find({ project: projectId })
    .populate("createdBy");
  res.status(200).json({ message: `done`, data: offers, success: true });
});
export const getAllOffer = asyncHandler(async (req, res, next) => {
  const offers = await offerModel.find().populate("createdBy");
  res.status(200).json({ message: `done`, data: offers, success: true });
});

export const getUserOffers = asyncHandler(async (req, res, next) => {
  const userId = req.user;
  const offers = await offerModel.find({ createdBy: userId }).populate([
    {
      path: "project",
    },
  ]);
  if (!offers || offers.length === 0) {
    return next(new Error("No offers Found", { cause: 400 }));
  }
  res.status(200).json({ message: `User offers`, data: offers, success: true });
});

export const addOffer = asyncHandler(async (req, res, next) => {
  const { project, description, price, time } = req.body;
  const userId = req.user;

  // Check if the user exists
  const user = await userModel.findById(userId);
  if (!user) {
    return next(new Error("No User found with this Id!", { cause: 400 }));
  }

  // Check if the user is a designer
  if (user.role !== "Designer") {
    return next(new Error("Only designers can add offers", { cause: 400 }));
  }

  // Check if the user has already added an offer for this project
  const existingOffer = await offerModel.findOne({
    project,
    createdBy: userId,
  });
  if (existingOffer) {
    return next(
      new Error("You have already added an offer for this Project", {
        cause: 409,
      })
    );
  }

  // Create the offer
  const offer = await offerModel.create({
    project,
    description,
    price,
    time,
    createdBy: userId,
  });

  // Add the offer ID to the project's list of designers' offers
  await projectModel.findOneAndUpdate(
    { name: project },
    { $push: { designersOffers: offer._id } },
    { returnOriginal: false }
  );

  res.status(200).json({
    message: "Offer added successfully!",
    data: offer,
    success: true,
  });
});

export const updateOffer = asyncHandler(async (req, res, next) => {
  const { description, price, time, status } = req.body;
  const userId = req.user;
  const offerId = req.params.offerId;
  const user = await userModel.findById(userId);
  const offer = await offerModel.findById(offerId);
  if (!offer) {
    return next(new Error("offer not found", { code: 404 }));
  }

  let newOffer = await offerModel.findByIdAndUpdate(
    offer._id,
    {
      description,
      price,
      time,
      updatedBy: userId,
      status,
    },
    { new: true }
  );
  return res.status(200).json({ message: "done ", newOffer, success: true });
});

export const deleteOffer = asyncHandler(async (req, res, next) => {
  const userId = req.user;
  const user = await userModel.findById(userId);
  const offerId = req.params.offerId;
  const offer = await offerModel.findById(offerId);
  if (!offer) {
    return next(new Error("offer not found", { code: 404 }));
  }
  if (user.role === "Admin") {
    await offerModel.findByIdAndDelete(offer._id);
    return res
      .status(200)
      .json({ message: "deleted successfully ", success: true });
  }
  if (offer.createdBy._id != userId) {
    return next(
      new Error("You don't have permission to perform this action.", {
        code: 404,
      })
    );
  }

  await offerModel.findByIdAndDelete(offer._id);
  return res
    .status(200)
    .json({ message: "deleted successfully ", success: true });
});
