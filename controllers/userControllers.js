const getProfileInfo = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Profile information",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProfileInfo = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Update Profile information",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProfilePic = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Update Profile picture",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCoverPhoto = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Update cover photo",
    });
  } catch (error) {
    console.log(error);
  }
};

const addFollowing = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Following is added",
    });
  } catch (error) {
    console.log(error);
  }
};

const removeFollowing = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Following is removed",
    });
  } catch (error) {
    console.log(error);
  }
};

const getFollowers = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Followers list",
    });
  } catch (error) {
    console.log(error);
  }
};

const getFollowing = (req, res) => {
  try {
    res.json({
      status: "success",
      msg: "Following users list",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProfileInfo,
  updateProfileInfo,
  updateProfilePic,
  updateCoverPhoto,
  addFollowing,
  removeFollowing,
  getFollowers,
  getFollowing,
};
