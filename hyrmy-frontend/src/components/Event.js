import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, useParams } from "react-router-dom";
import {
  createSuccessNotification,
  createErrorNotification,
  clearNotification
} from "../reducers/notificationReducer";
import { newLike, removeEvent, newComment } from "../reducers/eventReducer";

import { Button, Form } from "react-bootstrap";

const Event = props => {
  const [redirect, setRedirect] = useState(false);

  const id = useParams().id;
  const event = props.events.find(event => event.id === id);

  const removeHandler = async () => {
    if (!window.confirm(`Do you really want to remove ${event.title}?`)) {
      return;
    }
    setRedirect(true);
    props.createErrorNotification(`Removed ${event.title}.`);
    props.removeEvent(event.id);
    setTimeout(() => {
      props.clearNotification();
    }, 5000);
  };

  if (!event) {
    return null;
  } else {
    return (
      <div>
        <h2>{event.title}</h2>

        <p>Tapahtuma: {event.info}</p>

        {props.login ? (
          <Button onClick={() => removeHandler()}>Remove</Button>
        ) : null}
      </div>
    );
  }
};

const dispatchToProps = {
  createSuccessNotification,
  createErrorNotification,
  clearNotification,
  removeEvent
};

const mapStateToProps = state => {
  return {
    login: state.login,
    events: state.events
  };
};

export default connect(mapStateToProps, dispatchToProps)(Event);
