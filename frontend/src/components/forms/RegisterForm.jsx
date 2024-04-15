import { useState } from 'react'

import { validateRegisterForm } from '../../services/formAuthValidation'
import { toast } from 'react-toastify'
import { Button, Input } from '@nextui-org/react'

function RegisterForm () {
  // Version simple
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    password: null
  })

  const [formData, setFormData] = useState({
    firstName: 'Marius',
    lastName: 'Sergent',
    username: 'test56',
    email: 'tooto@toto.fr',
    password: '123456'
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const _errors = validateRegisterForm(formData)
    if (_errors) {
      setErrors(_errors)
    } else {
      toast.info(`Formulaire soumis : ${formData.firstName} ${formData.lastName}`)
    }
  }

  console.log(formData)

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <Input
        name='lastName'
        label='Nom : '
        placeholder='Entrez votre nom...'
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />
      <Input
        name='firstName'
        label='Prénom : '
        placeholder='Entrez votre prénom...'
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      <Input
        name='username'
        label="Nom d'utilisateur : "
        placeholder="Entrez votre nom d'utilisateur..."
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        name='email'
        label='Email : '
        placeholder='Entrez votre adresse email...'
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name='password'
        label='Mot de passe : '
        placeholder='Entrez un mot de passe...'
        value={formData.password}
        onChange={handleChange}
      />
      <Button
        type='submit'
        color='primary'
      >
        S'enregistrer
      </Button>
    </form>
  )
}

export default RegisterForm
