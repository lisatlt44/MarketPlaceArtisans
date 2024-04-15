import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { Button } from '@nextui-org/react'

function Dashboard () {
  const navigate = useNavigate()

  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }

  return (
    <>
      <h2>DASHBOARD</h2>
      <Button onClick={handleLogout}>
        Se déconnecter
      </Button>
    </>
  )
}

export default Dashboard
