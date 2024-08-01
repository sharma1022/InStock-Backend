const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controllers");


//GET list of all warehouses:
router.route("/").get(warehouseController.warehouseList);

router.route("/").post(warehouseController.add);

router.route("/:id").get(warehouseController.findOne);
router.route("/:id").delete(warehouseController.deleteWarehouse);

module.exports = router;
