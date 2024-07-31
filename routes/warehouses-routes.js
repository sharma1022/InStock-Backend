const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controllers");

//GET list of all items:
router.route("/").get(inventoryController.warehouseList);

router.route("/:id").get(warehouseController.findOne);

module.exports = router;
