const mongoose = require('mongoose');

const inventoryModel = require('./inventory.json');

const inventorySchema = mongoose.Schema(inventoryModel);

module.exports = mongoose.model('inventory', inventorySchema);
