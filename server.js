//enable express:
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();

//enable express to read json responses:
app.use(express.json());

// routes:
const inventoryRoutes = require("./routes/inventory-routes");
const warehouseRoutes = require("./routes/warehouses-routes");
app.use("/inventory", inventoryRoutes);
app.use("/warehouses", warehouseRoutes);

app.listen(PORT, () => {
	console.log(`running at http://localhost:${PORT} 👍`);
});
