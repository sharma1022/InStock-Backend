const knex = require("knex")(require("../knexfile"));

//GET list of all inventories:
const inventoryList = async (req, res) => {
	try {
		const data = await knex("inventories")
			.select("inventories.*", "warehouses.warehouse_name")
			.join("warehouses", "inventories.warehouse_id", "warehouses.id");
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({
			message: `Unable to retrieve data: ${error}`,
		});
	}
};

//GET detail for a specific item:
const details = async (req, res) => {
	try {
		const itemFound = await knex("inventories")
			.select("inventories.*", "warehouses.warehouse_name")
			.join("warehouses", "inventories.warehouse_id", "warehouses.id")
			.where("inventories.id", req.params.id);

		//if no item is found return 404:
		if (itemFound.length === 0) {
			return res.status(404).json({
				message: `Item ID ${req.params.id} not found`,
			});
		}

		const itemDetails = itemFound[0];
		res.json(itemDetails);
	} catch (error) {
		res.status(500).json({
			message: `Unable to retrieve data for item ID ${req.params.id}`,
		});
	}
};

// PUT /inventory/:id
const update = async (req, res) => {
	try {
		const rowsUpdated = await knex("inventories")
			.where({ id: req.params.id })
			.update(req.body);

		if (rowsUpdated === 0) {
			return res.status(404).json({
				message: `Inventory item with ID ${req.params.id} not found`,
			});
		}
		const updatedInventoryItem = await knex("inventories").where({
			id: req.params.id,
		});

		res.json(updatedInventoryItem[0]);
	} catch (e) {
		res.status(500).json({
			message: `Uable to update inventory with ID ${req.params.id}: ${e}`,
		});
	}
};

//POST a new item to the database:
const addItem = async (req, res) => {
	//destructure request body to make validation easier:
	const { item_name, description, category, status, quantity, warehouse_id } =
		req.body;

	try {
		//grab current list of warehouses:
		const warehouseList = await knex("warehouses");

		//ensure that all form data is provided:
		if (
			!warehouse_id ||
			!item_name ||
			!description ||
			!category ||
			!status ||
			//ensure 'quantity' is a number:
			typeof quantity !== "number"
		) {
			return res.status(400).json({
				message: `Please fill in each of the provided fields`,
			});
		}

		//check that a valid warehouse was selected:
		const specifiedWarehouse = warehouseList.find(
			warehouse => warehouse.id === warehouse_id
		);

		//insert the new item data into the table:
		const newInventoryItem = await knex("inventories")
			.insert({
				warehouse_id,
				item_name,
				description,
				category,
				status,
				quantity,
			})
			//return the newly created item:
			.returning("*");

		//confirm that a new inventory item was created:
		res.status(201).json(newInventoryItem);
	} catch (error) {
		//error message:
		res.status(500).json({
			message: `Unable to add new inventory item to database: ${error.message}`,
		});
	}
};

//DELETE inventory item by id
const deleteInventoryItem = async (req, res) => {
	try {
		const itemExists = await knex("inventories").where({
			id: req.params.id,
		});
		if (itemExists.length === 0) {
			return res.status(404).json({
				message: `Inventory Item with ID ${req.params.id} not found`,
			});
		}
		await knex("inventories").where({ id: req.params.id }).del();
		res.sendStatus(204);
	} catch (e) {
		res.status(500).json({
			message: `Unable to retrieve item data for inventory item with ID ${req.params.id}`,
		});
	}
};

module.exports = {
	details,
	inventoryList,
	addItem,
	deleteInventoryItem,
	update,
};
