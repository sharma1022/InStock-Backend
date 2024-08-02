const knex = require("knex")(require("../knexfile"));

//get detail for a specific item:
const details = async (req, res) => {
	try {
		//get item id from URL params:
		const itemFound = await knex("inventories").where({
			id: req.params.id,
		});

		//if no item is found return 404:
		if (itemFound.length === 0) {
			console.log(itemFound);
			return res.status(404).json({
				message: `Item ID ${req.params.id} not found`,
			});
		}

		//return the found item details:
		const itemDetails = itemFound[0];
		res.json(itemDetails);
	} catch (error) {
		//error message:
		res.status(500).json({
			message: `Unable to retrieve data for item ID ${req.params.id}`,
		});
	}
};

//post a new item to the database:
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

module.exports = { details, addItem };
