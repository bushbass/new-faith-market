import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

function EditBusiness() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const { id } = useParams()
  const [business, setBusiness] = useState({})
  const [title, setTitle] = useState('')
  const [owner, setOwner] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  useEffect(() => {
    const fetchBusiness = async () => {
      const response = await fetch(`/api/businesses/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      const json = await response.json()
      setBusiness(json)
      setTitle(json.title)
      setOwner(json.owner)
      setShortDescription(json.shortDescription)
      setIsPublished(json.isPublished)
    }

    if (user) {
      fetchBusiness()
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const business = { title, owner, shortDescription, isPublished }

    const response = await fetch(`/api/businesses/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(business),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setEmptyFields([])
    }
    navigate('/user')
  }

  return (
    <div>
      {console.log(business)}
      <h3>Edit Business</h3>
      <h4>Business : {business._id}</h4>
      <h4>user : {business.user_id}</h4>
      <form className='create' onSubmit={handleSubmit}>
        <label>Business Name:</label>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          // className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Owner:</label>
        <input
          type='text'
          onChange={(e) => setOwner(e.target.value)}
          value={owner}
          className={emptyFields.includes('owner') ? 'error' : ''}
        />

        <label>Short Description:</label>
        <input
          type='text'
          onChange={(e) => setShortDescription(e.target.value)}
          value={shortDescription}
          className={emptyFields.includes('shortDescription') ? 'error' : ''}
        />

        <label>Published:</label>
        <input
          type='text'
          onChange={(e) => setIsPublished(e.target.value)}
          value={isPublished}
          className={emptyFields.includes('isPublished') ? 'error' : ''}
        />

        <button>Add Business</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  )
}
export default EditBusiness
