import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITALIZE_USER'
const CREATE = 'CREATE_USER'
const UPDATE = 'UPDATE_USER' // user for add removing addresses and finalizing order
const REMOVE = 'REMOVE_USER'

/* ------------   ACTION CREATORS     ------------------ */

const init = userList => ({ type: INITIALIZE, userList})
const create = user => ({ type: CREATE_USER, user})
const update = user => ({ type: UPDATE_ACCOUNT, user })
const remove = user => ({ type: REMOVE_USER, user})

/* ------------       REDUCER     ------------------ */

export default (users = [], action) => {
  switch (action.type) {
  case INITIALIZE:
    return [action.userList]

  case CREATE:
    return [action.user, ...users]

  case UPDATE:
    return users.map(user => (
     user.id === action.user.id ? action.user : user
   ))

  case REMOVE:
    return users.filter(user => user.id !== action.user.id)

  default:
    return users
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
      .then(res => dispatch(init(res.data)))
}

export const addUser = user => dispatch => {
  axios.post('/api/users', user)
      .then(res => dispatch(create(res.data)))
      .catch(err => console.error(`Creating user: unsuccesful`, err))
}

export const updateUser = (id, user) => dispatch => {
  axios.put(`/api/users/${id}`, user)
      .then(res => dispatch(update(res.data)))
      .catch(err => console.error(`Updating user: ${user} unsuccesful`, err))
}

export const removeUser = id => dispatch => {
  dispatch(removeUser(id))
  axios.delete(`/api/users/${id}`)
   .catch(err => console.error(`Removing user: ${id} unsuccesful`, err))
}

export const addAddress = (userId, addressType, address) => dispatch => {
  axios.post(`/api/users/${userId}/addresses/${addressType}`, address)
   .then(res => dispatch(update(res.data)))
   .catch(err => console.error(`Adding address: ${addressType} unsuccessfull`, err))
}

export const updateAddress = (userId, addressType, addressId, address) => dispatch => {
  axios.put(`/api/users/${userId}/addresses/${addressType}/${addressId}`, address)
   .then(res => dispatch(update(res.data)))
   .catch(err => console.error(`Updating address: ${addressType} unsuccessfull`, err))
}

export const removeAddress = (userId, addressType, addressId) => dispatch => {
  axios.delete(`/api/users/${userId}/addresses/${addressType}/${addressId}`)
   .then(res => dispatch(update(res.data)))
   .catch(err => console.error(`Removing address: ${addressType} unsuccessfull`, err))
}
