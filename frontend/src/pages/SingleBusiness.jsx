import { useAuthContext } from '../hooks/useAuthContext';
import BusinessDetailsFields from '../components/BusinessDetailsFields';
import { Link, useLocation } from 'react-router-dom';

function SingleBusiness() {
  const {
    state: { business },
  } = useLocation();

  const { user } = useAuthContext();

  return (
    <div className="business-details">
      {business.user_id === user.id ? (
        <h4>
          <Link to={`/edit/${business._id}`}>{business.title}</Link>
        </h4>
      ) : (
        <h4>{business.title}</h4>
      )}

      <h3>
        this is the same as on the listing page but listing page will have short
        info and this page will have full info.
      </h3>
      <BusinessDetailsFields business={business} />

    </div>
  );
}

export default SingleBusiness;
