import eventService from '../services/events'



const eventReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_EVENT':
      return [...state, action.data]
    case 'LIKE':
      const likedId = action.data.id
      const eventToLike = state.find(n => n.id === likedId)
      const likedEVENT = {
        ...eventToLike,
        likes: eventToLike.likes + 1
      }
      state.sort(function (a, b) {
        if (b.id === likedId) {
          return (b.likes + 1) - a.likes
        } else if (a.id === likedId) {
          return b.likes - (a.likes + 1)
        } else
          return b.likes - a.likes
      })
      return state.map(event =>
        event.id !== likedId ? event : likedEVENT
      )

    case 'NEW_COMMENT':
      const commentId = action.data.id
      const comment = action.data.comment
      console.log('commentID: ', commentId)
      console.log('comment: ', comment)

      const eventToComment = state.find(n => n.id === commentId)
      console.log('EVENTToComment: ', eventToComment)
      const changedComments = eventToComment.comments
      changedComments.push(comment)
      const commentedEVENT = {
        ...eventToComment,
        comments: changedComments
      }
      return state.map(event =>
        event.id !== commentedEVENT ? event : commentedEVENT
      )


    case 'REMOVE_EVENT':
      const removeId = action.data.id
      const newEVENTs = state.filter(e => {
        return e.id !== removeId;
      });
      return newEVENTs

    case 'INIT_EVENTS':
      return action.data
    default:
      return state
  }
}

export const createEvent = (content, user) => {
  console.log(content)
  console.log(user)

  return async dispatch => {
    const newEVENT = await eventService.create(content)
    console.log(newEVENT)
    dispatch({
      type: 'NEW_EVENT',
      data: newEVENT
    })
  }
}

export const newLike = (id) => {
  return async dispatch => {
    await eventService.likeEVENT(id)
    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}

export const newComment = (id, comment) => {
  return async dispatch => {
    await eventService.commentEVENT(id, comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: { id, comment }
    })
  }
}

export const removeEvent = (id) => {
  return async dispatch => {
    await eventService.remove(id)
    dispatch({
      type: 'REMOVE_EVENT',
      data: { id }
    })
  }
}

export const initializeEvents = () => {
  return async dispatch => {
    const events = await eventService.getAll()

    dispatch({
      type: 'INIT_EVENTS',
      data: events
    })
  }
}

export default eventReducer