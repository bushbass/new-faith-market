const express = require('express');
const {
  createBusiness,
  getBusinesses,
  getBusiness,
  deleteBusiness,
  updateBusiness,
} = require('../controllers/businessController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all business routes
router.use(requireAuth);

// GET all of one users businesses
router.get('/', getBusinesses);

//GET a single business
router.get('/:id', getBusiness);

// POST a new business
router.post('/', createBusiness);

// DELETE a business
router.delete('/:id', deleteBusiness);

// UPDATE a business
router.patch('/:id', updateBusiness);

module.exports = router;
