const router = require("express").Router();

//connect to controller:
const inventoryController = require("../controllers/inventory-controllers");

//delegate request processing to the controller functions:

//all inventories
router.route("/").get(inventoryController.inventoryList);

//single item
router.route("/:id").get(inventoryController.details);

//DELETE inentory item by Id
router.route("/:id").delete(inventoryController.deleteInventroyItem);

module.exports = router;