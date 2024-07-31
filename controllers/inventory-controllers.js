const knex = require("knex")(require("../knexfile"));

//get detail for a specific item:
const details = async (req, res) => {
  try {
    const itemFound = await knex("inventories").where({
      id: req.params.id,
    });

    if (itemFound.length === 0) {
      console.log(itemFound);
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

// PATCH /inventory/:id
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
    const updatedInventoryItem = await knex("user").where({
      id: req.params.id,
    });

    res.json(updatedInventoryItem[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: `Uable to update user with ID ${req.params.id}: ${e}` });
  }
};

module.exports = { details, update };
