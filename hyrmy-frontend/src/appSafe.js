import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

//Comps
import Event from './components/Event'
import Notification from './components/Notifications'
import EventForm from './components/EventForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Events from './components/Events'
//Services
import eventService from './services/events'
import loginService from './services/login'
//Reducers
import { initializeEvents } from './reducers/noteReducer'

import "./App.css";



const App = () => {
  const [events, setEvents] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    eventService
      .getAll().then(initialEvents => {
        initialEvents.sort(function (a, b) {
          return b.likes - a.likes;
        });
        setEvents(initialEvents)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedEventappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      eventService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedEventappUser', JSON.stringify(user)
      )

      eventService.setToken(user.token)
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setErrorType('error')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedEventappUser')
    setUser(null)
  }

  const addEvent = (eventObject) => {
    eventService
      .create(eventObject)
      .then(returnedEvent => {
        setEvents(events.concat(returnedEvent))
      })
  }

  const handleLike = async (id, event) => {
    try {
      const filteredList = events.filter(b => {
        if (b.id === id) {
          return b
        }
      })
      var likedEvent = filteredList[0]

      const updatedEvent = {
        user: likedEvent.user,
        likes: likedEvent.likes + 1,
        author: likedEvent.author,
        title: likedEvent.title,
        url: likedEvent.url
      }


      var updatedList = events.filter(b => {
        if (b.id === id) {
          b.likes = b.likes + 1
        }
        return b
      })
      updatedList.sort(function (a, b) {
        return b.likes - a.likes;
      });
      setEvents(updatedList)



      const response = await eventService.update(id, updatedEvent)
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)



    } catch (exception) {
      setErrorMessage('Liking this event did not work.')
      setErrorType('error')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)
    }
  }



  const handleRemoveEvent = async (id, event) => {

    if (!window.confirm("Do you really want to remove this event?")) {
      return
    }

    try {
      const response = await eventService.remove(id)
      setErrorMessage('Event was removed.')
      setErrorType('success')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)

      const newEvents = events.filter(b => {
        return b.id !== id;
      });
      setEvents(newEvents)

    } catch (exception) {
      setErrorMessage('Removing event did not work.')
      setErrorType('error')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 5000)
    }
  }


  const logInPage = () => {

    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>

    )
  }

  const newEvent = () => {

    return (
      <Togglable id="new-event" buttonLabel="new event">
        <EventForm
          createEvent={addEvent}
        />
      </Togglable>
    )
  }

  const eventList = () => (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={() => handleLogout()}>Logout</button>
      <ul>
        {events.map((event, index) =>
          <div key={index}>
            <Event newID={index} user={user} event={event} handleLike={handleLike} handleRemoveEvent={handleRemoveEvent} />
          </div>
        )}
      </ul>
    </div >
  )


  return (
    <div>
      <h1>Events</h1>
      < Notification message={errorMessage} type={errorType} />
      {user === null ?
        logInPage()
        :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>Logout</button>
          <Events />
          {/*eventList()*/}
          {newEvent()}
        </div>
      }
    </div>
  )

}



export default connect(null, { initializeEvents })(App) 
