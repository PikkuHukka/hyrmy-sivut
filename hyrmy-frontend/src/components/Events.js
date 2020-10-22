import React from 'react'
import { connect } from 'react-redux'
import { newLike, removeEvent } from '../reducers/eventReducer'
import { createSuccessNotification, createErrorNotification, clearNotification } from '../reducers/notificationReducer'
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'




const Events = (props) => {

  return (
    <div>
      <h2>Events</h2>
     <Table striped>
        <tbody>
          {props.visibleEvents.map(event =>
            <tr key={event.id}>
              <td>
                <Link to={`events/${event.id}`} ><h3>{`${event.title}`}</h3></Link>
              </td>
            </tr>
          )}
        </tbody>

      </Table>
    
    </div >

  )
}


const eventsToShow = ({ events }) => {
  return events

}


const dispatchToProps = {
  newLike,
  removeEvent,
  createSuccessNotification,
  clearNotification,
  createErrorNotification
}
const mapStateToProps = (state) => {
  return {
    visibleEvents: eventsToShow(state),
    login: state.login
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(Events)
