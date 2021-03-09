const { Router } = require('express')
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/userController')

const router = Router()

router.get('/', usersGet)

router.put('/:userId', usersPut)
router.post('/', usersPost)
router.delete('/', usersDelete)

module.exports = router
