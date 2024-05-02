import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { Button, Input } from '@nextui-org/react'

function LoginForm () {
  // Définition de l'état pour les données du formulaire
  const [formData, setFormData] = useState({
    identifier: 'jeanmich@mail.com',
    password: 'jeanmich'
  })

  const navigate = useNavigate()

  // Récupération des données d'authentification depuis le contexte
  const { state: { user, jwt, error, loading }, login } = useAuth()

  // Redirection vers le tableau de bord si l'utilisateur est connecté
  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user, jwt])

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault()
    login(formData)
  }

  return (
    <form className='container mx-auto flex flex-col items-center justify-center mt-6 gap-4 max-w-[600px]' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 justify-between items-center mb-6'>
        <h1 className='text-3xl font-semibold text-center'>Formulaire de connexion</h1>
      </div>
      <Input
        type='email'
        name='identifier'
        label='Email : '
        placeholder='mail@provider.com'
        value={formData.identifier}
        onChange={handleChange}
      />
      <Input
        type='password'
        name='password'
        label='Mot de passe : '
        placeholder='*********'
        value={formData.password}
        onChange={handleChange}
      />
      {
        error && <p style={{ color: 'red' }}>{error}</p>
      }
      <Button
        isLoading={loading}
        type='submit'
        color='primary'
        variant='flat'
      >
        Se connecter
      </Button>
    </form>
  )
}

export default LoginForm
