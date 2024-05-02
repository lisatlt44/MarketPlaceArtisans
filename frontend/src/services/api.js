import axios from 'axios'

// Création d'une instance axios pour les requêtes nécessitant une authentification
const axiosAuthInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// Création d'une instance axios pour les requêtes ne nécessitant pas d'authentification
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// Ajout d'un intercepteur de requête pour ajouter le jwt dans les en-têtes
axiosAuthInstance.interceptors.request.use(function (config) {
  const savedAuth = window.localStorage.getItem('AUTH')
  if (savedAuth) {
    const auth = JSON.parse(savedAuth)
    config.headers.Authorization = 'Bearer ' + auth.jwt
  }

  return config
})

/**
 * Connexion d'un utilisateur
 * @param {object} credentials { identifier, password }
 * @return {object} { jwt, user }
 */
const loginApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/local', credentials)
  return response?.data
}

/**
 * Inscription d'un utilisateur
 * @param {object} credentials { identifier, password }
 * @return {object} { jwt, user }
 */
const registerApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/local/register', credentials)
  return response?.data
}

/**
 * Mise à jour du profil d'un utilisateur
 * @param {object} data
 * @param userId
 * @returns {object}
 */
const updateProfile = async (data, userId) => {
  const response = await axiosAuthInstance.put(`/users/${userId}`, data)
  return response?.data
}

/**
 * Liaison d'un compte utilisateur à un artisan
 * @param artisanId
 * @param userId
 * @returns {object}
 */
const updateUser = async (artisanId, userId) => {
  const response = await axiosAuthInstance.put(`/users/${userId}`, { artisan: artisanId })
  return response?.data
}

/**
 * Suppression d'un compte utilisateur
 * @param userId
 * @returns {object}
 */
const deleteAccount = async (userId) => {
  const response = await axiosAuthInstance.delete(`/users/${userId}`)
  return response?.data
}

/**
 * Mise à jour d'un produit
 * @param {object} data
 * @param productId
 * @returns {object}
 */
const updateProduct = async (data, productId) => {
  const response = await axiosAuthInstance.put(`/products/${productId}`, data)
  return response?.data
}

/**
 * Suppression d'un produit
 * @param productId
 * @returns {object}
 */
const deleteProduct = async (productId) => {
  const response = await axiosAuthInstance.delete(`/products/${productId}`)
  return response?.data
}

/**
 * Ajout d'un produit
 * @param {object} data
 * @returns {object}
 */
const addProduct = async (data) => {
  const response = await axiosAuthInstance.post('/products', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response?.data
}

export {
  loginApi,
  registerApi,
  updateProfile,
  deleteAccount,
  updateProduct,
  deleteProduct,
  addProduct,
  updateUser
}
