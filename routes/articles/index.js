const express = require('express');
const router = express.Router();

const ArticleController = require('../../controllers/ArticleController');

router.get('/', ArticleController.fetchAll);
router.get('/:slug', ArticleController.fetchBySlug);
router.post('/', ArticleController.create);
router.put('/:slug', ArticleController.update);
router.delete('/:slug', ArticleController.delete);

module.exports = router;
