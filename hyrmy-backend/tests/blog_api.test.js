const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Event = require('../models/event')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')


const api = supertest(app)


beforeEach(async () => {
  await Event.deleteMany({})
  await Event.insertMany(helper.initialEvents)

})

test('events are returned as json', async () => {
  await api
    .get('/api/events')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id is defined', async () => {
  const response = await api.get('/api/events')
  expect(response.body[0].id.toBeDefined)

})

test('a valid event can be added2 ', async () => {
  const user = await User.findOne({ username: process.env.TESTERACCOUNT })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(process.env.TESTERPASSWORD, user.passwordHash)

  if ((user && passwordCorrect)) {
    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)


    const newEvent = {
      author: 'pikkuhukka',
      title: 'How do I get likes?',
      url: 'www.testausOnHassua.fi'
    }


    await api
      .post('/api/events')
      .set('Authorization', token)
      .send(newEvent)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/events')
    expect(response.body[response.body.length - 1].title).toBe('How do I get likes?')
    expect(response.body[response.body.length - 1].likes).toBe(0)
  }
})



test('there are two events', async () => {
  const response = await api.get('/api/events')

  expect(response.body.length).toBe(helper.initialEvents.length)
})

test('the first event is about hassutin', async () => {
  const response = await api.get('/api/events')

  expect(response.body[0].title).toBe('Kuinka Olla Hassutin')
})

test('a valid event can be added ', async () => {


  const user = await User.findOne({ username: process.env.TESTERACCOUNT })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(process.env.TESTERPASSWORD, user.passwordHash)

  if ((user && passwordCorrect)) {
    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)



    const newEvent = {
      author: 'testaajaJabaSiis',
      title: 'async/await simplifies making async calls',
      likes: 5,
      url: 'www.testausOnHassua.fi'
    }

    await api
      .post('/api/events')
      .set('Authorization', token)
      .send(newEvent)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const eventsAtEnd = await helper.eventsInDb()
    expect(eventsAtEnd.length).toBe(helper.initialEvents.length + 1)

    const titles = eventsAtEnd.map(n => n.title)


    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
  }

})


test('event without title or url is not added', async () => {

  const user = await User.findOne({ username: process.env.TESTERACCOUNT })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(process.env.TESTERPASSWORD, user.passwordHash)

  if ((user && passwordCorrect)) {
    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    const newEvent = {
      author: 'testaajaJabaSiis',
      likes: 5,
      url: 'www.testausOnHassua.fi'
    }

    const newEvent2 = {
      author: 'testaajaJabaSiis',
      likes: 4,
      title: 'testauksen taito'
    }

    await api
      .post('/api/events')
      .set('Authorization', token)
      .send(newEvent)
      .expect(400)

    const response = await api.get('/api/events')

    expect(response.body.length).toBe(helper.initialEvents.length)

    await api
      .post('/api/events')
      .send(newEvent2)
      .expect(400)

    expect(response.body.length).toBe(helper.initialEvents.length)

  }
})
test('event without token cant be added.', async () => {

  const newEvent = {
    author: process.env.TESTACCOUNT,
    title: 'How do I get likes?',
    url: 'www.testausOnHassua.fi'
  }


  await api
    .post('/api/events')
    .send(newEvent)
    .expect(401)
    .expect('Content-Type', /application\/json/)



})



afterAll(() => {
  mongoose.connection.close()
})

