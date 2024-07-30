const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controllers");

router.route("/:id").get(warehouseController.findOne);
router.route("/:id").delete(warehouseController.deleteWarehouse);

module.exports = router;
