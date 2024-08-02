//enable express:
const express = require("express");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
require("dotenv").config();

//enable express to read json responses:
app.use(express.json());
app.use(cors());

// routes:
const inventoryRoutes = require("./routes/inventory-routes");
const warehouseRoutes = require("./routes/warehouses-routes");
app.use("/inventory", inventoryRoutes);
app.use("/warehouses", warehouseRoutes);

app.listen(PORT, () => {
	console.log(`running at http://localhost:${PORT} 👍`);
});
