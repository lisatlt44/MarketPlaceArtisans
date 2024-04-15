import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (endpoint) => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + endpoint)
        console.log(response)
        setResponse(response.data.data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setError(error)
        setIsLoading(false)
      }
    }
    getData()
  }, [endpoint])

  return { response, error, isLoading }
}

export {
  useFetch
}
