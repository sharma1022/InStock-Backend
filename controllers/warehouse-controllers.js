const knex = require("knex")(require("../knexfile"));

//GET list of all warehouses:
const warehouseList = async (req, res) => {
	try {
		const data = await knex("warehouses");
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({
			message: `Unable to retrieve data: ${error}`,
		});
	}
};

//GET /warehouses/:id
const findOne = async (req, res) => {
	try {
		const warehousesFound = await knex("warehouses").where({
			id: req.params.id,
		});

		if (warehousesFound.length === 0) {
			return res.status(404).json({
				message: `Warehouse with ID ${req.params.id} not found`,
			});
		}
		const warehouseData = warehousesFound[0];
		res.json(warehouseData);
	} catch (e) {
		res.status(500).json({
			message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
		});
	}
};

//POST /warehouses
const add = async(req,res) => {
    if(!req.body.warehouse_name || !req.body.address || !req.body.city || !req.body.country || !req.body.contact_name || !req.body.contact_position || !req.body.contact_phone || !req.body.contact_email){
        return res.status(400).json({
            message:"Missing Information"
        });
    }

    try{
        const result = await knex("warehouses").insert(req.body);

        const newWarehouseId = result[0];
        const createdWarehouse = await knex("warehouses").where({id: newWarehouseId});

        res.status(201).json(createdWarehouse);
    } catch(e){
        res.status(500).json({message:`Unable to create new warehouse: ${error}`});
    }
}

module.exports = { warehouseList, findOne, add };
