import { createContext, useContext, useEffect, useReducer } from 'react'
import { loginApi, registerApi } from '../services/api'
import { toast } from 'react-toastify'

// Création du contexte d'authentification
const AuthContext = createContext()

// Définition des types d'actions pour le réducteur
const actionTypes = {
  LOGIN: 'LOGIN', // Connecté avec succès
  REGISTER: 'REGISTER', // Inscrit + connecté avec succès
  LOGOUT: 'LOGOUT', // Déconnecté
  LOADING: 'LOADING', // Chargement
  ERROR: 'ERROR', // Erreur
  RESET: 'RESET' // Réinitialisation de l'état
}

// Définition de l'état initial
const initialState = {
  jwt: null,
  user: null,
  loading: false,
  isLoggedIn: false,
  error: null
}

/**
 * @param prevState Etat précédent l'action
 * @param action Action pour mettre à jour l'état = { type, data? = { jwt, user, error } }
 */
const authReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER:
    case actionTypes.LOGIN:
      return {
        jwt: action.data.jwt,
        user: action.data.user,
        isLoggedIn: true,
        loading: false,
        error: null
      }
    case actionTypes.ERROR:
      return {
        jwt: null,
        user: null,
        loading: false,
        isLoggedIn: false,
        error: action.data.error
      }
    case actionTypes.LOADING:
      return {
        ...prevState, // Recopie de l'état précédent
        loading: true
      }
    case actionTypes.RESET:
    case actionTypes.LOGOUT:
      return initialState
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

// Factory pour les actions d'authentification
const authFactory = (dispatch) => ({
  login: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await loginApi(credentials)
      dispatch({
        type: actionTypes.LOGIN,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
    } catch (error) {
      toast.error('Identifiant ou mot de passe incorrect')
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: 'Identifiant ou mot de passe incorrect'
        }
      })
    }
  },
  register: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await registerApi(credentials)
      dispatch({
        type: actionTypes.REGISTER,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
    } catch (error) {
      console.error(error)
      const errorMessage = typeof error === 'string' ? error : error.response?.data?.error?.message
      toast.error(errorMessage)
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: errorMessage
        }
      })
    }
  },
  logout: () => {
    dispatch({ type: actionTypes.LOGOUT })
  }

})

// Provider du contexte d'authentification
const AuthProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState

  const [state, dispatch] = useReducer(authReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={{ state, ...authFactory(dispatch) }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte d'authentification
const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an <AuthProvider>')
  return context
}

export {
  AuthProvider,
  useAuth
}
