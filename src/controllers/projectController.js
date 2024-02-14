const {
  createProjectService,
  getProjectService,
  deleteProjectService,
  editProjectService,
} = require("../services/productService");
module.exports = {
  postCreateProject: async (req, res) => {
    let projects = await createProjectService(req.body);

    return res.status(200).json({
      EC: 0,
      data: projects,
    });
  },
  getProject: async (req, res) => {
    let result = await getProjectService(req.query);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteAProject: async (req, res) => {
    let result = await deleteProjectService(req.body);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putEditProject: async (req, res) => {
    let customer = await editProjectService(req.body);
    if (customer) {
      return res.status(200).json({
        EC: 0,
        data: customer,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: customer,
      });
    }
  },
  
};
