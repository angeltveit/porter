const router = require('express').Router()
const api = require('../../services/api')

router.post('/', api(require('./login')))

module.exports = router