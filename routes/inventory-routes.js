const router = require("express").Router();

//connect to controller:
const inventoryController = require("../controllers/inventory-controllers");

//delegate request processing to the controller functions:

//single item
router.route("/:id").get(inventoryController.details);

module.exports = router;
