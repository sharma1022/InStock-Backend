//enable express:
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5550;

//enable express to read json responses:
app.use(express.json());
app.use(cors());

// routes:
const inventoryRoutes = require("./routes/inventory-routes");
const warehouseRoutes = require("./routes/warehouses-routes");
app.use("/inventory", inventoryRoutes);
app.use("/warehouses", warehouseRoutes);

app.get("/", (req, res) => {
	res.send("Welcome to the InStock API!");
});

app.listen(PORT, () => {
	console.log(`running at http://localhost:${PORT} 👍`);
});
