import React from 'react'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function HomeBusinessDetailsFields({ business }) {
  return (
    <>
      <p>
        <strong>Owner: </strong>
        {business.owner}
      </p>
      <p>
        <strong>Short Description: </strong>
        {business.shortDescription}
      </p>
      <p>
        <strong>Campus: </strong>
        {business.campus}
      </p>
      <p>
        <strong>Category: </strong>
        {business.category}
      </p>
      <p>
        {formatDistanceToNow(new Date(business.createdAt), { addSuffix: true })}
      </p>
    </>
  )
}

export default HomeBusinessDetailsFields
