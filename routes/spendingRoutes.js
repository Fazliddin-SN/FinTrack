const express = require('express');
const router = express.Router();
const spendingController = require('../controllers/spendingController');

router.post('/', spendingController.createSpending);
router.get('/', spendingController.getSpendings);
router.put('/:id', spendingController.updateSpending);
router.delete('/:id', spendingController.deleteSpending);

module.exports = router;
