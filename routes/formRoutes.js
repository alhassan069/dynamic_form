const express = require('express');
const formController = require('../controllers/formController');
const router = express.Router();

router.post('/form', formController.createForm);
router.post('/fill_data', formController.postInfo);
router.get('/fill_data', formController.getInfo);

module.exports = router;
