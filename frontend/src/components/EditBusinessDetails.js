import { Link } from 'react-router-dom';

import BusinessDetailsFields from './BusinessDetailsFields';

const EditBusinessDetails = ({ business }) => {
  return (
    <div className="business-details">
      <h4>
        <Link to={`/edit/${business._id}`}>{business.title}</Link>
      </h4>
      <BusinessDetailsFields business={business} />
    </div>
  );
};

export default EditBusinessDetails;
