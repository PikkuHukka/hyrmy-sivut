const eventsRouter = require('express').Router()
const Event = require('../models/event')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


eventsRouter.get('/', async (request, response) => {
  const events = await Event.find({})
  response.json(events.map(event => event.toJSON()))
})


eventsRouter.get('/testi', (request, response) => {
  response.send('<h1>Hello Testi!</h1>')
})


eventsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)


  const event = new Event({
    title: body.title,
    info: body.info,
    user: user._id
  })


  const savedEvent = await event.save()



  user.events = user.events.concat(savedEvent._id)
  await user.save()

  const palautettavaEvent = await Event.findById(savedEvent.id)
    .populate('user', { username: 1, name: 1 })

  response.json(palautettavaEvent.toJSON())
})


eventsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  const foundEvent = await Event.findById(request.params.id)
  console.log(foundEvent)
  console.log(user)
  if (foundEvent.user.toString() === user.id.toString()) {
    await Event.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({
      error: 'incorrect token'
    })
  }

})

eventsRouter.get('/:id', async (request, response) => {
  const event = await Event.findById(request.params.id)
  if (event) {
    response.json(event.toJSON())
  } else {
    response.status(404).end()
  }
})

eventsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const updatedEvent = {
    title: body.title,
    author: body.author,
    likes: body.likes === undefined ? 0 : body.likes,
    url: body.url,
    comments: body.comments,
    date: new Date()
  }

  await Event.findByIdAndUpdate(request.params.id, updatedEvent, { new: true })
  response.status(200).end()
})


module.exports = eventsRouter