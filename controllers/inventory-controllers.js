const knex = require("knex")(require("../knexfile"));

//GET list of all inventories:
const inventoryList = async (req, res) => {
	try {
		const data = await knex("inventories");
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({
			message: `Unable to retrieve data: ${error}`,
		});
	}
};

//get detail for a specific item:
const details = async (req, res) => {
	try {
		const itemFound = await knex("inventories")
			.select("inventories.*", "warehouses.warehouse_name")
			.join("warehouses", "inventories.warehouse_id", "warehouses.id")
			.where("inventories.id", req.params.id);

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

// DELETE inventory item by id
const deleteInventroyItem = async (req,res) => {
  try {
    const itemExists = await knex("inventories").where({id: req.params.id});
    if(itemExists.length === 0){
      return res.status(404).json({
        message: `Inventory Item with ID ${req.params.id} not found`
      });
    }
    await knex("inventories")
    .where({id: req.params.id})
    .del();
    res.sendStatus(204);
  } catch (e) {
   res.status(500).json({
    message: `Unable to retrieve item data for inventory item with ID ${req.params.id}`
   }) 
  }
}


module.exports = { details, inventoryList, deleteInventroyItem };