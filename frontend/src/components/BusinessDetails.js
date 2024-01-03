// import { useBusinessesContext } from '../hooks/useBusinessesContext'
// import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BusinessDetails = ({ business }) => {
  // const { dispatch } = useBusinessesContext()
  // const { user } = useAuthContext()

  // const handleClick = async () => {
  //   if (!user) {
  //     return
  //   }

  //   const response = await fetch('/api/businesses/' + business._id, {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   })
  //   const json = await response.json()

  //   if (response.ok) {
  //     dispatch({ type: 'DELETE_WORKOUT', payload: json })
  //   }
  // }

  return (
    <div className='business-details'>
      <h4>
        <Link to={`/edit/${business._id}`}>{business.title}</Link>
      </h4>
      <p>
        <strong>Owner: </strong>
        {business.owner}
      </p>
      <p>
        <strong>Short Description: </strong>
        {business.shortDescription}
      </p>
      <p>
        <strong>Published: </strong>
        {business.isPublished ? 'true' : 'false'}
      </p>
      <p>
        <strong>Business Id: </strong>
        {business._id}
      </p>
      <p>
        <strong>User ID: </strong>
        {business.user_id}
      </p>
      <p>
        {formatDistanceToNow(new Date(business.createdAt), { addSuffix: true })}
      </p>
      {/* <span className='material-symbols-outlined' onClick={handleClick}>
        delete
      </span> */}
    </div>
  )
}

export default BusinessDetails
