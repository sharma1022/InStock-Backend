const router = require("express").Router();

//connect to controller:
const inventoryController = require("../controllers/inventory-controllers");

//delegate request processing to the controller functions

//POST a new item to the database:
router.route("/").post(inventoryController.addItem);

//GET the list of all inventory items:
router.route("/").get(inventoryController.inventoryList);

//GET the details of a single item:
router.route("/:id").get(inventoryController.details);

//DELETE inventory an item by Id
router
  .route("/:id")
  .delete(inventoryController.deleteInventroyItem)
  .patch(inventoryController.update);

module.exports = router;
