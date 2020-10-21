var lodash = require('lodash')

const dummy = (events) => {
  return 1
}

const totalLikes = (events) => {
  const reducer = (sum, currentObject) => {
    return sum + currentObject.likes
  }
  return events.reduce(reducer, 0)
}

const favoriteevent = (events) => {
  const reducer = (best, currentObject) => {
    if (currentObject.likes > best) {
      return currentObject.likes
    } else {
      return best
    }
  }
  return events.reduce(reducer, 0)
}



const mostevents = (events) => {
  var myArray = []

  for (var event of events) {
    if (lodash.some(myArray, { 'author': event.author })) {
      for (var arrayEntry of myArray) {
        if (arrayEntry.author === event.author) {
          arrayEntry.events = arrayEntry.events + 1
        }
      }

    } else {
      myArray.push({ 'author': event.author, 'events': 1 })
    }
  }


  var mostevents = 0
  var mostAuthor = ''

  for (var author of myArray) {
    if (arrayEntry.events > mostevents) {
      mostevents = author.events
      mostAuthor = author.author
    }
  }


  return mostAuthor
}

const mostLikesByAuthor = (events) => {
  var myArray = []

  for (var event of events) {
    if (lodash.some(myArray, { 'author': event.author })) {
      for (var arrayEntry of myArray) {
        if (arrayEntry.author === event.author) {
          arrayEntry.events = arrayEntry.events + event.likes
        }
      }

    } else {
      myArray.push({ 'author': event.author, 'events': event.likes })
    }
  }


  var mosteventLikes = 0
  var mostAuthor = ''

  for (var author of myArray) {
    if (arrayEntry.events > mosteventLikes) {
      mosteventLikes = author.events
      mostAuthor = author.author
    }
  }


  return mostAuthor
}



module.exports = {
  dummy, totalLikes, favoriteevent, mostevents, mostLikesByAuthor
}