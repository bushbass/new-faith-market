import { useState } from 'react';
import { useBusinessesContext } from '../hooks/useBusinessesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const BusinessForm = () => {
  const { dispatch } = useBusinessesContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [campus, setCampus] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const business = { title, owner, shortDescription, longDescription, campus };

    const response = await fetch('/api/businesses', {
      method: 'POST',
      body: JSON.stringify(business),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle('');
      setOwner('');
      setShortDescription('');
      setLongDescription('');
      setCampus('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_BUSINESS', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Business</h3>

      <label>Business Name:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        // className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Owner:</label>
      <input
        type="text"
        onChange={(e) => setOwner(e.target.value)}
        value={owner}
        className={emptyFields.includes('owner') ? 'error' : ''}
      />

      <label>Short Description:</label>
      <input
        type="text"
        onChange={(e) => setShortDescription(e.target.value)}
        value={shortDescription}
        className={emptyFields.includes('shortDescription') ? 'error' : ''}
      />
      <label>Long Description:</label>
      <input
        type="text"
        onChange={(e) => setLongDescription(e.target.value)}
        value={longDescription}
        className={emptyFields.includes('longDescription') ? 'error' : ''}
      />
      <label>Campus:</label>
      <input
        type="text"
        onChange={(e) => setCampus(e.target.value)}
        value={campus}
        className={emptyFields.includes('campus') ? 'error' : ''}
      />

      <button>Add Business</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default BusinessForm;
