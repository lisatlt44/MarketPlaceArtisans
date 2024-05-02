import { createContext, useContext, useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'

// Création du contexte du panier
const CartContext = createContext()

// Définition des types d'actions pour le réducteur
const actionTypes = {
  ADD: 'ADD', // Ajout d'un produit au panier
  REMOVE: 'REMOVE', // Suppression d'un produit du panier
  CLEAR: 'CLEAR' // Reset du panier
}

// État initial du panier
const initialState = []

/**
 * @param prevState Etat précédent l'action
 * @param action Action pour mettre à jour l'état
 */
const cartReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...prevState,
        items: [...prevState.items, action.data]
      }
    case actionTypes.REMOVE:
      return {
        ...prevState,
        items: prevState.items.filter((item) => item.id !== action.data.id)
      }
    case actionTypes.CLEAR:
      return initialState
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

// Factory pour les actions du panier
const cartFactory = () => ({
  addToCart: async (item) => {
    try {
      const savedCart = window.localStorage.getItem('CART')
      const cart = savedCart ? JSON.parse(savedCart) : []
      cart.push(item)
      window.localStorage.setItem('CART', JSON.stringify(cart))
      window.dispatchEvent(new Event('storage'))
    } catch (error) {
      console.error(error)
    }
  },
  deleteFromCart: async (id) => {
    try {
      const savedCart = window.localStorage.getItem('CART')
      if (savedCart) {
        let cart = JSON.parse(savedCart)
        cart = cart.filter(product => product.id !== id)
        window.localStorage.setItem('CART', JSON.stringify(cart))
        toast.success('Votre produit a été supprimé du panier avec succès')
        window.dispatchEvent(new Event('storage'))
      }
    } catch (error) {
      console.error(error)
    }
  }
})

// Provider du contexte du panier
const CartProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('CART')
  const _initialState = savedState ? JSON.parse(savedState) : initialState

  const [state] = useReducer(cartReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('CART', JSON.stringify(state))
  }, [state])

  const { addToCart, deleteFromCart } = cartFactory()

  return (
    <CartContext.Provider value={{ state, addToCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte du panier
const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside an <AuthProvider>')
  return context
}

export {
  CartProvider,
  useCart
}
