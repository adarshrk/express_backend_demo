const Inventory = require("../models/inventory");

const getInventory = (req, res) => {
  Inventory.find({}, (err, response) => {
    if (err) res.send(err);
    res.json(response);
  });
};

const getInventoryById = (req, res) => {
  const id = req.params.id;
  Inventory.findById(id, (err, item) => {
    if (err) res.send(err);
    res.json(item);
  });
};

const addItemToInventory = (req, res) => {
  const inventoryData = { ...req.body };
  inventoryData.last_checked_date = "";
  inventoryData.is_checked_out = false;
  inventoryData.last_checked_out_by = "";
  Inventory.create(inventoryData, (err, response) => {
    if (err) res.send(err);
    res.send(response);
  });
};

const updateItemInInventory = (req, res) => {
  const id = req.params.id;
  const updatedItem = { ...req.body, last_checked_date: new Date()};
  Inventory.updateOne({ _id: id }, updatedItem, (err, response) => {
    if (err) res.send(err);
    res.send(response);
  });
};

const deleteItemInInventory = (req, res) => {
  const id = req.params.id;
  Inventory.deleteOne({ _id: id }, (err, response) => {
    if (err) res.send(err);
    res.json(response);
  });
};

module.exports = {
  getInventory,
  getInventoryById,
  addItemToInventory,
  updateItemInInventory,
  deleteItemInInventory,
};
