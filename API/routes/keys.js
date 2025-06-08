const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorizeRole');
const { getAllKeys, createKey } = require('../controllers/keyController');

router.use(auth);
router.get('/', authorize(['admin']), getAllKeys);
router.post('/', authorize(['admin']), createKey);

module.exports = router;
