const router = require('express').Router()
const bearer = require('./middleware/bearer')

router.use(bearer())
router.use('/users', require('./users'))
router.use('/auth', require('./auth'))
module.exports = router