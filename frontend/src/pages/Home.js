import { useEffect } from 'react'
import { useBusinessesContext } from '../hooks/useBusinessesContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import BusinessDetails from '../components/BusinessDetails'

const Home = () => {
  const { businesses, dispatch } = useBusinessesContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchBusinesses = async () => {
      const response = await fetch('/api/businesses/published', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_BUSINESSES', payload: json })
      }
    }

    if (user) {
      fetchBusinesses()
    }
  }, [dispatch, user])

  return (
    <div className='home'>
      <div className='businesses'>
      <h2>Published businesses from all users</h2>
        {businesses &&
          businesses.map((business) => (
            <BusinessDetails key={business._id} business={business} />
          ))}
      </div>
    </div>
  )
}

export default Home
