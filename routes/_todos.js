const { Router } = require('express');
const router = Router();
const prefix = '/todos';
const { index, show, store, update, destroy, destroyMultiple } = require('../controllers/todos.controller');
const { auth } = require('../middlewares/auth.middleware');

const { body } = require('express-validator');

router.get(prefix, auth, index);
router.get(prefix + '/:todo', auth, show);

router.post(prefix, auth, [
    body('title').isString().not().isEmpty()
], store);

router.patch(prefix + '/:todo', auth, [
    body('title').isString().not().isEmpty()
], update);

router.delete(prefix + '/:todo', auth, destroy);
router.post(prefix + '/multiple', auth, destroyMultiple);

module.exports = router;