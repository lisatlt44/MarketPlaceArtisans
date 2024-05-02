import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/forms/RegisterForm'
import LoginForm from '../components/forms/LoginForm'
import { useAuth } from '../contexts/authContext'

function Auth () {
  // Définition d'un état local pour basculer entre la connexion et l'inscription
  const [isRegister, setIsRegister] = useState(false)

  const navigate = useNavigate()

  const { state: { jwt, user } } = useAuth()

  // Redirection vers la page tableau de bord si l'utilisateur est déjà authentifié
  useEffect(() => {
    if (jwt && user) {
      navigate('/dashboard')
    }
  }, [])

  return (
    <>
      {
        isRegister
          ? <RegisterForm />
          : <LoginForm />
      }
      <a onClick={() => setIsRegister(!isRegister)} className='container mx-auto flex flex-col items-center justify-center cursor-pointer my-4'>
        {isRegister ? "J'ai déjà un compte" : "Je n'ai pas de compte"}
      </a>
    </>
  )
}

export default Auth
