import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

function PrivateRoute () {
  // Récupération de l'utilisateur et du jwt à partir du contexte d'authentification
  const { state: { jwt, user } } = useAuth()

  return (
    jwt && user ? <Outlet /> : <Navigate to='/authentication' />
  )
}

export default PrivateRoute
