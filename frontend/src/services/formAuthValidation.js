import { isEmail, isLength } from 'validator'

// Fonction pour valider les données du formulaire d'inscription
const validateRegisterForm = (formData) => {
  const errors = {}

  if (typeof formData === 'object') {
    // Checking FirstName
    if (!isLength(formData.firstName, { min: 2, max: undefined })) {
      errors.firstName = 'First name is invalid, minimum 2 characters required'
    }
    // Checking LastName
    if (!isLength(formData.lastName, { min: 2, max: undefined })) {
      errors.lastName = 'Last name is invalid, minimum 2 characters required'
    }
    // Checking Email
    if (!isEmail(formData.email)) {
      errors.email = 'Invalid email format'
    }
    // Checking Password
    if (!isLength(formData.password, { min: 8, max: undefined })) {
      errors.password = 'Password is invalid, minimum 8 characters required'
    }
  } else {
    throw new Error('Champ invalide')
  }

  return errors
}

export {
  validateRegisterForm
}
