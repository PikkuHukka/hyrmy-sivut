import React from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { clearLogin } from '../reducers/loginReducer'

const Header = (props) => {

  const headerStyle = {
    border: 'solid',
    borderWidth: 5,
    padding: 10,

  }
  const padding = {
    padding: 5,
  }
  const toRight = {
    padding: 5,
    float: 'right'
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    props.clearLogin()
  }
  return (
    <div style={headerStyle}>
          <Link style={padding} to="/">Etusivu</Link>

      <Link style={padding} to="/events">Events</Link>


    </div>
  )
}

const dispatchToProps = {
  clearLogin
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}


export default connect(
  mapStateToProps,
  dispatchToProps
)(Header)
