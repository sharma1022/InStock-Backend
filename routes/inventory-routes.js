const router = require("express").Router();

//connect to controller:
const inventoryController = require("../controllers/inventory-controllers");

//delegate request processing to the controller functions:

router.route("/").get(inventoryController.inventoryList);

//single item
router
  .route("/:id")
  .get(inventoryController.details)
  .patch(inventoryController.update);

module.exports = router;
