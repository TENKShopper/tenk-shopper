import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITALIZE_REVIEW'
const CREATE = 'CREATE_REVIEW'
const UPDATE = 'UPDATE_REVIEW' // user for add removing addresses and finalizing order
const REMOVE = 'REMOVE_REVIEW'

/* ------------   ACTION CREATORS     ------------------ */

const init = reviewList => ({ type: INITIALIZE, reviewList})
const create = review => ({ type: CREATE_REVIEW, review})
const update = review => ({ type: UPDATE_ACCOUNT, review })
const remove = review => ({ type: REMOVE_REVIEW, review})

/* ------------       REDUCER     ------------------ */

export default (reviews = [], action) => {
  switch (action.type) {
  case INITIALIZE:
    return [action.reviewList]

  case CREATE:
    return [action.review, ...reviews]

  case UPDATE:
    return reviews.map(review => (
     review.id === action.review.id ? action.review : review
   ))

  case REMOVE:
    return reviews.filter(review => review.id !== action.review.id)

  default:
    return reviews
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchReviews = () => dispatch => {
  axios.get('/api/reviews')
      .then(res => dispatch(init(res.data)))
}

export const addReview = review => dispatch => {
  axios.post('/api/reviews', review)
      .then(res => dispatch(create(res.data)))
      .catch(err => console.error(`Creating review: unsuccesful`, err))
}

export const updateReviews = (id, review) => dispatch => {
  axios.put(`/api/reviews/${id}`, review)
      .then(res => dispatch(update(res.data)))
      .catch(err => console.error(`Updating review: ${review} unsuccesful`, err))
}
