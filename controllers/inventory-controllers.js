const knex = require("knex")(require("../knexfile"));

//get detail for a specific item:
const details = async (req, res) => {
	try {
		const itemFound = await knex("inventory").where({
			id: req.params.id,
		});

		if (itemFound.length === 0) {
			return res
				.status(404)
				.json({
					message: `Item ID ${req.params.id} not found`,
				});
		}

		const itemDetails = itemFound[0];
		res.json(itemDetails);
	} catch {
		res.status(500).json({
			message: `Unable to retrieve data for item ID ${req.params.id}`,
		});
	}
};

module.exports = { details };
