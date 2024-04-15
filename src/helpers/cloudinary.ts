import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// configure cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config({
  cloud_name: "dmsyoa2lq", //process.env.CLOUDINARY_CLOUD_NAME,
  api_key: "649278495318135", //process.env.CLOUDINARY_API_KEY,
  api_secret: "YnVr4AUupx6Ep-60c106FTx_2dk", // process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: any) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
