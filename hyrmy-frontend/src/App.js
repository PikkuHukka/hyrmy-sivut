import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Components
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import Users from "./components/Users";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import Header from "./components/Header";
import FrontPage from "./components/FrontPage";
import Events from "./components/Events";
import Event from "./components/Event";
import EventForm from "./components/EventForm";

//Reducers
import { setLoginFromToken } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import { initializeEvents } from "./reducers/eventReducer";

//Services
import eventService from "./services/events";

const App = props => {
  const loggedLoginJSON = window.localStorage.getItem("loggedEventappLogin");

  useEffect(() => {
    props.initializeEvents();
    props.initializeUsers();
    if (loggedLoginJSON) {
      const login = JSON.parse(loggedLoginJSON);
      props.setLoginFromToken(login);
      eventService.setToken(login.token);
    }
  }, []);

  const meta = {
    meta: {
      charset: "utf-8"
    }
  };
  return (
    <div class="container">
      <Router>
        <Header />
        <Notification />
        <Switch>
          <Route path="/events/:id">
            <Event />
          </Route>
          <Route path="/events">
            <Events />
          </Route>


 {props.login ? (
                     
                          <Route path="/addevent">
                              <EventForm />
                          </Route>
                      
                  ) : (
                         
                              <Route path="/login">
                                  <LoginForm />
                              </Route>
                       
                      )}
                  <Route path="/">
                      <FrontPage />
                  </Route>
              </Switch>

        <Footer />
      </Router>
    </div>
  );
};

const dispatchToProps = {
  setLoginFromToken,
  initializeUsers,
  initializeEvents
};
const mapStateToProps = state => {
  return {
    login: state.login,
    users: state.users
  };
};

export default connect(mapStateToProps, dispatchToProps)(App);
