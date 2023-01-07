const commentModel = require("../../models/comment");
const userModel = require("../../models/user");
const courseModel = require("../../models/course");

exports.create = async (req, res) => {
  const { body, courseShortName } = req.body;

  const course = await courseModel.findOne({ shortName: courseShortName });

  const comment = await commentModel.create({
    body,
    course: course._id,
    creator: req.user._id,
  });

  return res.status(201).json(comment);
};

// exports.getAll = async (req, res) => {
//   const courses = await courseModel.find().populate("creator", "-password");

//   return res.json(courses);
// };
