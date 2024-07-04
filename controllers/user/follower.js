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
  addFollowing,
  removeFollowing,
  getFollowers,
  getFollowing,
};
