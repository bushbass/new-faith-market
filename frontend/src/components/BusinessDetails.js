import { Link } from 'react-router-dom';
import ShortBusinessDetailsFields from './ShortBusinessDetailsFields';

const BusinessDetails = ({ business }) => {
  return (
    <div className="business-details">
      <h4>
        <Link to={`/single/${business._id}`} state={{ business }}>
          {business.title}
        </Link>
      </h4>
      <ShortBusinessDetailsFields business={business} />
    </div>
  );
};

export default BusinessDetails;
