const path = require("path");
const uploadSingleFiles = async (fileObject) => {
  let uploadPath = path.resolve(__dirname, "../public/images/upload");
  let extName = path.extname(fileObject.name);
  let baseName = path.basename(fileObject.name, extName);
  let finalName = `${baseName}-${Date.now()}${extName}`;

  let finalPath = `${uploadPath}/${finalName}`;

  // Use the mv() method to place the file somewhere on your server
  try {
    await fileObject.mv(finalPath);
    return {
      status: "success",
      path: finalPath,
      error: null,
    };
  } catch (error) {
    if (error.status == 500) {
      return res.status(500).send(err);
    }

    return {
      status: "failed",
      path: null,
      error: JSON.stringify(error),
    };
  }
};
const uploadMultipleFiles = async (filesArray) => {
  try {
    let uploadPath = path.resolve(__dirname, "../public/images/upload");
    let resultArr = [];
    let countSucess = 0;
    for (let i = 0; i < filesArray.length; i++) {
      let fileObject = filesArray[i];
      let extName = path.extname(fileObject.name);
      let baseName = path.basename(fileObject.name, extName);
      let finalName = `${baseName}-${Date.now()}${extName}`;
      let finalPath = `${uploadPath}/${finalName}`;

      // Di chuyển file đến finalPath
      try {
        resultArr.push({
          countSucess: countSucess + 1,
          status: "success",
          filename: fileObject.name,
          path: finalPath,
          error: null,
        });
        countSucess++;
      } catch (error) {
        resultArr.push({
          status: "failed",
          path: null,
          error: JSON.stringify(error),
          filename: fileObject.name,
        });
      }
      await fileObject.mv(finalPath);
    }

    return resultArr;
  } catch (error) {
    console.error(error);
    return {
      status: "failed",
      path: null,
      error: JSON.stringify(error),
    };
  }
};

module.exports = {
  uploadMultipleFiles,
  uploadSingleFiles,
};
