import { Link } from 'react-router-dom'
import BusinessDetailsFields from './BusinessDetailsFields'

const BusinessDetails = ({ business }) => {
  return (
    <div className='business-details'>
      <h4>
        <Link to={`/single/${business._id}`} state={{ business }}>
          {business.title}
        </Link>
      </h4>
      <BusinessDetailsFields business={business} />
    </div>
  )
}

export default BusinessDetails
