const express = require("express");
const router = express.Router();

const Unit = require("../models/unit");
// RESTFUL ENDPOINTS
// GET, POST, PATCH, DELETE

const getUnit = async (req, res, next) => {
	let unit;
	try {
		unit = await Unit.findById(req.params.id);
		if (unit === null) {
			return res.status(404).json({ message: "Unit not found." });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	res.unit = unit;
	next();
};

// GET ALL
router.get("/", async (req, res) => {
	try {
		const units = await Unit.find();
		res.json(units);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// GET ONE
router.get("/:id", getUnit, async (req, res) => {
	res.json(res.unit);
});

// POST CREATE
router.post("/", async (req, res) => {
	const unit = new Unit({
		name: req.body.name,
		faction: req.body.faction,
	});

	try {
		const newUnit = await unit.save();
		res.status(201).json(newUnit);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// PATCH UPDATE
router.patch("/:id", getUnit, async (req, res) => {
	if (req.body.name != null) {
		res.unit.name = req.body.name;
	}
	if (req.body.faction != null) {
		res.unit.faction = req.body.faction;
	}
	try {
		const updatedUnit = await res.unit.save();
		res.json(updatedUnit);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// DELETE
router.delete("/:id", getUnit, async (req, res) => {
	try {
		await res.unit.deleteOne();
		res.json({ message: "Removed unit" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
