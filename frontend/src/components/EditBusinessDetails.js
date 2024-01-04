import { Link } from 'react-router-dom';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const EditBusinessDetails = ({ business }) => {
  return (
    <div className="business-details">
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
    </div>
  );
};

export default EditBusinessDetails;
