import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// delete old model
// if (mongoose.models.skills) {
//   const skillsModel = mongoose.model("skills");
//   mongoose.deleteModel(skillsModel.modelName);
// }

// create new model
const skills = mongoose.model("skills", skillSchema);
export default skills;
