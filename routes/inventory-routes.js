const router = require("express").Router();

//connect to controller:
const inventoryController = require("../controllers/inventory-controllers");

//delegate request processing to the controller functions

//add a new item:
router.route("/").post(inventoryController.addItem);

//get the details of a single item:
router.route("/:id").get(inventoryController.details);

module.exports = router;
