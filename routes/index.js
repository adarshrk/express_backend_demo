const router = require('express').Router();

const inventoryModel = require('../models/inventory');

router.get('/inventory', inventoryModel.getInventory);
router.get('/inventory/:id', inventoryModel.getInventoryById);
router.put('/inventory/:id', inventoryModel.updateItemInInventory);
router.post('/inventory', inventoryModel.addItemToInventory);
router.delete('/inventory/:id', inventoryModel.deleteItemInInventory);

module.exports = router;