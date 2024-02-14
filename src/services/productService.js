const project = require("../models/project");

const aqp = require("api-query-params");

module.exports = {
  createProjectService: async (data) => {
    try {
      if (data.type === "EMPTY-PROJECTS") {
        let result = await project.create(data);
        return result;
      }
      if (data.type === "REMOVE-USERS") {
        let myProject = await project.findById(data.projectId).exec();
        if (!myProject) {
          console.log("Project not found with id:", data.projectId);
          return null; // Hoặc trả về lỗi cụ thể
        }
        for (let i = 0; i < data.usersArr.length; i++) {
          myProject.usersInfor.pull(data.usersArr[i]);
        }
        let newresult = await myProject.save();

        return newresult;
      }
      if (data.type === "ADD-USERS") {
        let myProject = await project.findById(data.projectId).exec();
        if (!myProject) {
          console.log("Project not found with id:", data.projectId);
          return null; // Hoặc trả về lỗi cụ thể
        }
        for (let i = 0; i < data.usersArr.length; i++) {
          myProject.usersInfor.push(data.usersArr[i]);
        }
        let newresult = await myProject.save();

        return newresult;
      }
      if (data.type === "ADD-TASKS") {
        let myProject = await project.findById(data._id).exec();
        console.log("?>>>", myProject);
        if (!myProject) {
          console.log("Project not found with id:", data._id);
          return null; // Hoặc trả về lỗi cụ thể
        }
        for (let i = 0; i < data.taskArr.length; i++) {
          myProject.tasks.push(data.taskArr[i]);
        }
        let newresult = await myProject.save();

        return newresult;
      }
    } catch (error) {
      console.log("<<", error);
      return null;
    }
  },
  getProjectService: async (queryString) => {
    const page = queryString.page;

    const { filter, limit, population } = aqp(queryString);

    delete filter.page;
    try {
      let offset = (page - 1) * limit;
      let result = await project
        .find(filter)
        .populate(population)
        .skip(offset)
        .limit(limit)
        .exec();

      return result;
    } catch (error) {
      console.error(error); // For example, log the error
      throw error;
    }
  },
  deleteProjectService: async (id) => {
    try {
      let result = await project.deleteById(id);
      return result;
    } catch (error) {
      console.log("error >>>", error);
      return null;
    }
  },
  editProjectService: async (projectData) => {
    try {
      let result = await project.updateOne(
        { _id: projectData._id },
        {
          name: projectData.name,
          startDate: projectData.startDate,
          endDate: projectData.endDate,

          description: projectData.description,
        }
      );
      return result;
    } catch (error) {
      console.log("error >>>", error);
      return null;
    }
  },
};
