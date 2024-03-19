const express = require('express');
const router = express.Router();
const Income = require('../models/income');

router.get('/', async (req, res) => {
  try {
    const income = await Income.find();
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const income = new Income({
    description: req.body.description,
    amount: req.body.amount
  });

  try {
    const newIncome = await income.save();
    res.status(201).json(newIncome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
