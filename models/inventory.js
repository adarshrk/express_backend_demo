const uniqid = require('uniqid');

let {inventory} = require('../data/inventory');

const getInventory = (req, res) => {
    res.json(inventory);
};

const getInventoryById = (req, res) => {
    const id = req.params.id;
    const item = inventory.find((item) => {
        console.log(item.id, id);
        return item.id === id;
    });
    res.json(item);
};

const addItemToInventory = (req, res) => {
    const inventoryData = {...req.body};
    inventoryData.id = uniqid();
    inventoryData.lastCheckedDate = '';
    inventoryData.isCheckedOut = false;
    inventoryData.lastCheckedOutBy = '';
    inventory.push(inventoryData);
    res.send(inventoryData);
};

const updateItemInInventory = (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    inventory.forEach((item, index) => {
        if(item.id === id) {
            inventory[index] = { ...updatedItem, lastCheckedDate: new Date()};
            return;
        };
    });
    res.json(inventory);
};

const deleteItemInInventory = (req, res) => {
    const id = req.params.id;
    let deletedItem = null;
    inventory.forEach((item, index) => {
        if(item.id === id) {
            deletedItem = inventory.splice(index, 1);
            return;
        }
    });
    res.send(deletedItem);
};

module.exports = {
    getInventory,
    getInventoryById,
    addItemToInventory,
    updateItemInInventory,
    deleteItemInInventory
};
