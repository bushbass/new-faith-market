import React from 'react';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function ShortBusinessDetailsFields({ business }) {
  return (
    <>
      <p>
        <strong>Owner: </strong>
        {business.owner}
      </p>
      <p>
        <strong>Short Description: </strong>
        {business.shortDescription}
      </p>
    </>
  );
}

export default ShortBusinessDetailsFields;
