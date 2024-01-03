import React, { useEffect, useState } from 'react';
import { useBusinessesContext } from '../hooks/useBusinessesContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';

function SingleBusiness() {
  const {
    state: { business },
  } = useLocation();

  const { businesses, dispatch } = useBusinessesContext();
  const { id } = useParams();

  return (
    <div className="business-details">
      <h4>
        <Link to={`/edit/${business._id}`}>{business.title}</Link>
      </h4>
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
