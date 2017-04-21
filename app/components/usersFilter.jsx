/*

This is the component  we'll use for the Users views.

The component consists of a sidebar (2/3 col) and a display (10/9 col). It maintains local state, which tracks the inputs of the query form.

The sidebar always renders with said query form. When the user is an admin, it renders with an additional form to add a new user.

The display renders all the UserItem components delineated by the Users prop passed through state.

*/

import React, {Component} from 'react'
import {connect} from 'react-redux'

// import UsersItem from './usersItem'

/* ----- COMPONENT ----- */

class UsersFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: ''
    }
    this.renderUsersFilter = this.renderUsersFilter.bind(this)
    this.renderNewUserWidget = this.renderNewUserWidget.bind(this)
    this.filterUsers = this.filterUsers.bind(this)
    this.submitNewUser = this.submitNewUser.bind(this)
  }
  render() {
    return (
      <div className="container">
        <div className="col-xs-2">
          { this.props.isAdmin ? this.renderNewUserWidget() : null }
          { this.renderUsersFilter() }
        </div>
        <div className="col-xs-10">
          Users go here.
          {/*
            { this.props.users &&
            this.props.users
            .filter(this.filterUsers)
            .map(user => <UserItem user={user} key={user.id} />)
          }*/}
        </div>
      </div>
    )
  }
}

const filterUsers = (user) => {
  const nameMatch = new RegExp(this.state.name, 'i')
  const emailMatch = new RegExp(this.state.email, 'i')
  return nameMatch.test(user.name) &&
        emailMatch.test(user.email)
}

const renderUsersFilter = () => {
  return (
    <div className="list-group-item min-content user-item">
      <div className="media">
        <div className="media-left media-middle icon-container">
          <span className="glyphicon glyphicon-search" />
        </div>
        <div className="media-body">
          <h4 className="media-heading tucked">
            <input
              type="text"
              placeholder="Jean Doe"
              className="form-like"
              onChange={evt => this.setState({ name: evt.target.value })}
            />
          </h4>
          <h5 className="tucked">
            <input
              type="email"
              placeholder="email@website.com"
              className="form-like"
              onChange={evt => this.setState({ email: evt.target.value })}
            />
          </h5>
        </div>
      </div>
    </div>
  )
}

const renderNewUserWidget = () => {
  return (
    <div>
      <h3>Add a User</h3>
      <div className="list-group-item min-content user-item">
        <form className="media" onSubmit={this.submitNewUser}>
          <div className="media-left media-middle icon-container">
            <button
              type="submit"
              className="glyphicon glyphicon-plus clickable"
            />
          </div>
          <div className="media-body">
            <h4 className="media-heading tucked">
              <input
                name="name"
                type="text"
                required
                placeholder="Jean Doe"
                className="form-like"
              />
            </h4>
            <h5 className="tucked">
              <input
                name="email"
                type="email"
                required
                placeholder="email@website.com"
                className="form-like"
              />
            </h5>
          </div>
        </form>
      </div>
    </div>
  )
}

const submitNewUser = (event) => {
  event.preventDefault()
  const user = {
    name: event.target.name.value,
    email: event.target.email.value,
  }
  this.props.addUser(user)
  // clear the inputs
  event.target.name.value = ''
  event.target.email.value = ''
}

/* ----- CONTAINER ----- */

// TODO: revisit what state to pass to props
const mapStateToProps = (state) => {
  return {
    isAdmin: state.currentUser && state.currentUser.isAdmin,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersFilter)
