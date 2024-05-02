import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/authContext'

const useFetchWithAuth = (endpoint) => {
  const { state: { jwt } } = useAuth()
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + endpoint, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
        setResponse(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setError(error)
        setIsLoading(false)
      }
    }
    if (jwt) {
      getData()
    }
  }, [endpoint, jwt])

  return { response, error, isLoading }
}

export {
  useFetchWithAuth
}
