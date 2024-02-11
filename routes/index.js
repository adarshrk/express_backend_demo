const router = require('express').Router();

const inventoryController = require('../controllers/inventory');

router.get('/', (req, res) => res.status(200).send('Welcome aboard!!!'));

router.get('/inventory', inventoryController.getInventory);
router.get('/inventory/:id', inventoryController.getInventoryById);
router.put('/inventory/:id', inventoryController.updateItemInInventory);
router.post('/inventory', inventoryController.addItemToInventory);
router.delete('/inventory/:id', inventoryController.deleteItemInInventory);

module.exports = router;