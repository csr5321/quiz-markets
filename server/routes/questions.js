const express = require('express');
const router = express.Router();
const { 
    getQuestions, 
    createQuestion, 
    updateQuestion, 
    deleteQuestion 
} = require('../controllers/questionController');
const auth = require('../middleware/auth');
const { validateQuestion } = require('../middleware/validation');

router.get('/', auth, getQuestions);
router.post('/', [auth, validateQuestion], createQuestion);
router.put('/:id', [auth, validateQuestion], updateQuestion);
router.delete('/:id', auth, deleteQuestion);

module.exports = router;
