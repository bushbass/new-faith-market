import { useAuthContext } from '../hooks/useAuthContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { Link, useLocation } from 'react-router-dom';

function SingleBusiness() {
  const {
    state: { business },
  } = useLocation();

  const { user } = useAuthContext();

  return (
    <div className="business-details">
      {console.log(business.user_id, user.id)}

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
      <h3>need to make it so this page only link to edit if users match</h3>
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
    </div>
  );
}

export default SingleBusiness;
