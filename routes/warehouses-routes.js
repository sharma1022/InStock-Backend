const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controllers");

router.route("/").post(warehouseController.add);

router.route("/:id").get(warehouseController.findOne);

module.exports = router;
