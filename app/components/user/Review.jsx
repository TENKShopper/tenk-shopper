import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

const Review = ({ review }) => (
  <div className='review'>
    <p>
      {review.body}
    </p>
    <div>
      {review.rating}
    </div>
  </div>
)

export default Review
