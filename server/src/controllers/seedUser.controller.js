const data = require("../../data");
const user = require("../models/users.model");
const Products = require("../models/productsModel");

const seedUser = async (req, res, next) => {
  try {
    // deleting all existing users
    await user.deleteMany({});

    // inserting new users
    const users = await user.insertMany(data.user);

    return res.status(201).json(users);
  } catch (error) {}
};
const seedProducts = async (req, res, next) => {
  try {
    // deleting all existing users
    await Products.deleteMany({});

    // inserting new users
    const products = await Products.insertMany(data.products);

    return res.status(201).json(products);
  } catch (error) {}
};

module.exports = { seedUser, seedProducts };
