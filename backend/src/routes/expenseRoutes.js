const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary
} = require('../controllers/expenseController');

const validate = require('../middleware/validate');

// Validation rules
const expenseValidationRules = [
  body('title').notEmpty().withMessage('Title is required').isString().trim(),
  body('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number').custom(value => value >= 0).withMessage('Amount must be positive'),
  body('category').notEmpty().withMessage('Category is required').isString().trim(),
  body('date').optional().isISO8601().toDate().withMessage('Invalid date format'),
  body('description').optional().isString().trim()
];

// Routes
router.route('/summary').get(getSummary);

router.route('/expenses')
  .get(getExpenses)
  .post(expenseValidationRules, validate, createExpense);

router.route('/expenses/:id')
  .get(getExpense)
  .put(expenseValidationRules, validate, updateExpense)
  .delete(deleteExpense);

module.exports = router;
