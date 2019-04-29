const router = require('express').Router()
const api = require('../../services/api')

router.post('/', api(require('./create')))

module.exports = router