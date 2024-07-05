const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const profilePicStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogearth/profilPic",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: { width: 400, height: 400, gravity: "auto", crop: "fill" },
  },
});

const coverPhotoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogearth/coverPhoto",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: { width: 1028, height: 500, gravity: "auto", crop: "fill" },
  },
});

const deleteFile = async (file_id) => {
  try {
    await cloudinary.uploader.destroy(file_id);
  } catch (error) {
    return error;
  }
};

module.exports = {
  profilePicStorage,
  coverPhotoStorage,
  deleteFile,
};
