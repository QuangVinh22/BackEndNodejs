const {
  createTaskService,
  getTaskService,
  deleteTaskService,
  editTaskService,
} = require("../services/taskService");
module.exports = {
  postCreateTasks: async (req, res) => {
    let tasks = await createTaskService(req.body);

    return res.status(200).json({
      EC: 0,
      data: tasks,
    });
  },
  getAllTask: async (req, res) => {
    let tasks = await getTaskService(req.query);
    return res.status(200).json({
      EC: 0,
      data: tasks,
    });
  },
  deleteATask: async (req, res) => {
    let tasks = await deleteTaskService(req.body);
    return res.status(200).json({
      EC: 0,
      data: tasks,
    });
  },
  UpdateATask: async (req, res) => {
    let tasks = await editTaskService(req.body);
    return res.status(200).json({
      EC: 0,
      data: tasks,
    });
  },
};
