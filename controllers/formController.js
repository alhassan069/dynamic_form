const formService = require('../services/formService');
const responseHandler = require('../utils/responseHandler');

exports.createForm = async (req, res) => {
  try {
    const result = await formService.createForm(req.body);
    responseHandler.success(res, 201, result, "Table created successfully");
  } catch (error) {
    responseHandler.error(res, error);
  }
};

exports.postInfo = async (req, res) => {
  try {
    const result = await formService.postInfo(req.query.form_title, req.body);
    responseHandler.success(res, 200, result, "Data added successfully");
  } catch (error) {
    responseHandler.error(res, error);
  }
};

exports.getInfo = async (req, res) => {
  try {
    const result = await formService.getInfo(req.query.form_title);
    responseHandler.success(res, 200, result);
  } catch (error) {
    responseHandler.error(res, error);
  }
};
