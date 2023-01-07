const categoryModel = require("../../models/category");

exports.create = async (req, res) => {
  const { title, name } = req.body;

  const newCategory = await categoryModel.create({ title, name });

  return res.status(201).json(newCategory);
};
