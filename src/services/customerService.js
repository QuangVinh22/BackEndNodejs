const Customer = require("../models/customer");
const aqp = require("api-query-params");

module.exports = {
  createCustomerService: async (customerData) => {
    try {
      let result = await Customer.create({
        name: customerData.name,
        address: customerData.address,
        phone: customerData.phone,
        email: customerData.email,
        description: customerData.description,
        image: customerData.image,
      });
      return result;
    } catch (error) {
      console.log("<<", error);
      return null;
    }
  },
  createArrayCustomerService: async (arr) => {
    try {
      let result = await Customer.insertMany(arr);
      return result;
    } catch (error) {
      console.log("erro>>>>>", error);
      return null;
    }
  },
  getAllCustomerService: async (limit, page, name, queryString) => {
    try {
      //phan trang trong moogoose
      let result = null;
      if (limit && page) {
        let offset = (page - 1) * limit;
        const { filter } = aqp(queryString);
        delete filter.page;
        result = await Customer.find(filter).skip(offset).limit(limit).exec();
      } else {
        result = await Customer.find({});
      }

      return result;
    } catch (error) {
      console.log("error >>>", error);
      return null;
    }
  },
  putEditCustomerService: async (customerData) => {
    try {
      let result = await Customer.updateOne(
        { _id: customerData._id },
        {
          name: customerData.name,
          address: customerData.address,
          phone: customerData.phone,
          email: customerData.email,
          description: customerData.description,
        }
      );
      return result;
    } catch (error) {
      console.log("error >>>", error);
      return null;
    }
  },
  deleteAcustomerService: async (id) => {
    try {
      let result = await Customer.deleteById(id);
      return result;
    } catch (error) {
      console.log("error >>>", error);
      return null;
    }
  },
  deleteArrayCustomerService: async (id) => {
    try {
      let result = await Customer.deleteById(id);
      return result;
    } catch (error) {
      console.log("error >>>", error);
      return null;
    }
  },
};
