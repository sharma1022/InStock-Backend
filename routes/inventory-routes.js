const router = require("express").Router();

//connect to controller:
const inventoryController = require("../controllers/inventory-controllers");

//delegate request processing to the controller functions:


router
  .route("/:id")
  //single item
  .get(inventoryController.details)
  //update inventory item
  .patch(inventoryController.update);

module.exports = router;
