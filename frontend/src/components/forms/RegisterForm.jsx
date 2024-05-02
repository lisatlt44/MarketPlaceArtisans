import { useEffect, useState } from 'react'
import { validateRegisterForm } from '../../services/formAuthValidation'
import { Button, Input } from '@nextui-org/react'
import { useAuth } from '../../contexts/authContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function RegisterForm () {
  // Définition de l'état pour les données du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  })

  // Définition de l'état pour les erreurs du formulaire
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    password: null
  })

  // Récupération des données d'authentification depuis le contexte
  const { state: { user, jwt, loading }, register } = useAuth()
  const navigate = useNavigate()

  // Redirection vers le tableau de bord si l'utilisateur est connecté
  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user, jwt])

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault()
    const _errors = validateRegisterForm(formData)
    if (Object.keys(_errors).length > 0) {
      setErrors(_errors)
      Object.values(_errors).forEach((errorMessage) => {
        toast.error(errorMessage)
      })
      return
    }
    register(formData)
    toast.success('Votre compte a été créé !')
  }

  return (
    <form className='container mx-auto flex flex-col items-center justify-center mt-6 gap-4 max-w-[600px]' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 justify-between items-center mb-6'>
        <h1 className='text-3xl font-semibold text-center'>Formulaire d'inscription</h1>
      </div>
      <Input
        name='firstName'
        label='Prénom'
        placeholder='Jean'
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      <Input
        name='lastName'
        label='Nom'
        placeholder='Dupont'
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />
      <Input
        name='username'
        label="Nom d'utilisateur"
        placeholder='jean.dupont'
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        name='email'
        label='Email'
        placeholder='jean.dupont@test.com'
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name='password'
        label='Mot de passe'
        placeholder='jeandupont00'
        value={formData.password}
        onChange={handleChange}
      />
      <Button
        isLoading={loading}
        type='submit'
        color='primary'
        variant='flat'
      >
        S'enregistrer
      </Button>
    </form>
  )
}

export default RegisterForm
