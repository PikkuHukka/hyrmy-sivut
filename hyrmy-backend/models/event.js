const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  info: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Event', eventSchema)
