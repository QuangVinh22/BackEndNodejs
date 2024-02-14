const { uploadSingleFiles } = require("../services/fileService");
const {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomerService,
  putEditCustomerService,
  deleteAcustomerService,
  deleteArrayCustomerService,
} = require("../services/customerService");
const Joi = require("joi");
const { response } = require("express");
//
module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      phone: Joi.string().pattern(new RegExp("^[0-9]{8,11}$")),
      address: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      description: Joi.string(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    return res.status(200).json({
      msg: error,
    });

    let imageUrl = "";
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      let result = await uploadSingleFiles(req.files.image);
      imageUrl = result.path;
    }

    let customerData = {
      name,
      address,
      phone,
      email,
      description,
      image: imageUrl,
    };
    let customer = await createCustomerService(customerData);
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  postCreateManyCustomer: async (req, res) => {
    let customer = await createArrayCustomerService(req.body.customers);

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
  getAllCustomer: async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let name = req.query.name;
    let customer = null;
    if (limit && page) {
      customer = await getAllCustomerService(limit, page, name, req.query);
    } else customer = await getAllCustomerService();

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
  putEditCustomer: async (req, res) => {
    let { _id, name, address, phone, email, description } = req.body;

    let customerData = {
      _id,
      name,
      address,
      phone,
      email,
      description,
    };
    let customer = await putEditCustomerService(customerData);
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
  deleteACustomer: async (req, res) => {
    let id = req.body.id;
    console.log(id);
    let result = await deleteAcustomerService(id);
    if (result) {
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: result,
      });
    }
  },
  deleteArrayCustomer: async (req, res) => {
    let id = req.body.id;
    let result = await deleteArrayCustomerService(id);
    if (result) {
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: result,
      });
    }
  },
};
