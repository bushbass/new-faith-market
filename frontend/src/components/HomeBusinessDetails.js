import { Link } from 'react-router-dom'

import HomeBusinessDetailsFields from './HomeBusinessDetailsFields'

const EditBusinessDetails = ({ business }) => {
  return (
    <div className='business-details'>
      <h4>
        <Link to={`/single/${business._id}`}>{business.title}</Link>
      </h4>
      <HomeBusinessDetailsFields business={business} />
    </div>
  )
}

export default EditBusinessDetails
