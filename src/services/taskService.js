const task = require("../models/task");

const aqp = require("api-query-params");

module.exports = {
  createTaskService: async (data) => {
    try {
      if (data.type === "EMPTY-PROJECTS") {
        let result = await task.create(data);
        return result;
      }
      // if (data.type === "ADD-TASKS") {
      //   let myProject = await project.findById(data._id).exec();
      //   console.log("?>>>", myProject);
      //   if (!myProject) {
      //     console.log("Project not found with id:", data._id);
      //     return null; // Hoặc trả về lỗi cụ thể
      //   }
      //   for (let i = 0; i < data.usersArr.length; i++) {
      //     myProject.tasks.push(data.taskArr[i]);
      //   }
      //   let newresult = await myProject.save();

      //   return newresult;
      // }
      //   if (data.type === "REMOVE-USERS") {
      //     let myProject = await project.findById(data.projectId).exec();
      //     if (!myProject) {
      //       console.log("Project not found with id:", data.projectId);
      //       return null; // Hoặc trả về lỗi cụ thể
      //     }
      //     for (let i = 0; i < data.usersArr.length; i++) {
      //       myProject.usersInfor.pull(data.usersArr[i]);
      //     }
      //     let newresult = await myProject.save();

      //     return newresult;
      //   }
      //   if (data.type === "ADD-USERS") {
      //     let myProject = await project.findById(data.projectId).exec();
      //     if (!myProject) {
      //       console.log("Project not found with id:", data.projectId);
      //       return null; // Hoặc trả về lỗi cụ thể
      //     }
      //     for (let i = 0; i < data.usersArr.length; i++) {
      //       myProject.usersInfor.push(data.usersArr[i]);
      //     }
      //     let newresult = await myProject.save();

      //     return newresult;
      //   }
    } catch (error) {
      console.log("<<", error);
      return null;
    }
  },
  getTaskService: async (queryString) => {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString);
    delete filter.page;
    try {
      let offset = (page - 1) * limit;
      let result = await task
        .find(filter)
        .populate(population)
        .skip(offset)
        .limit(limit)
        .exec();

      return result;
    } catch (error) {
      return error;
    }
  },
  deleteTaskService: async (id) => {
    try {
      let result = await task.deleteById(id);
      return result;
    } catch (error) {
      console.log("error >>>", error);
      return null;
    }
  },
  editTaskService: async (taskData) => {
    try {
      let result = await task.updateOne(
        { _id: taskData._id },
        {
          ...taskData,
        }
      );
      return result;
    } catch (error) {
      console.log("error >>>", error);
      return null;
    }
  },
};
