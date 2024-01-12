import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLocation } from 'react-router-dom';
import ShortBusinessDetailsFields from './ShortBusinessDetailsFields';
const BusinessDetails = ({ business }) => {
  const { user } = useAuthContext();

  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="business-details">
      <h4>
        <Link to={`/single/${business._id}`} state={{ business }}>
          {business.title}
        </Link>
      </h4>
      <ShortBusinessDetailsFields business={business} />
      {pathname === '/user' ? business.isPublished ? <p>Published</p> : <p>Unpublished</p> : null}
    </div>
  );
};

export default BusinessDetails;
