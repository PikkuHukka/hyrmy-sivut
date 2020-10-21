const router = require('express').Router()
const Event = require('../models/event')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Event.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router