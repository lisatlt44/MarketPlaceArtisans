import React, { useEffect, useState } from 'react'
import { useCart } from '../../contexts/cartContext'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon } from '../../assets/icons/DeleteIcon'
import { EyeIcon } from '../../assets/icons/EyeIcon'

const Cart = () => {
  // Récupération de la fonction de suppression d'un produit au panier du contexte cartContext
  const { deleteFromCart } = useCart()

  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  // Récupération du panier sauvegardé dans le localStorage
  useEffect(() => {
    const savedCart = window.localStorage.getItem('CART')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Ecouteur à la mise à jour du panier
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCart = window.localStorage.getItem('CART')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Redirection vers la page du produit en utilisant le slug de l'artisan
  const handleGoToProductPage = (slug) => {
    navigate(`/artisans/${slug}`)
  }

  // Définition des colonnes de la table
  const columns = [
    { name: 'Nom', uid: 'name' },
    { name: 'Description', uid: 'description' },
    { name: 'Prix', uid: 'price' },
    { name: 'Artisan', uid: 'artisan' },
    { name: 'Actions', uid: 'actions' }
  ]

  const renderCell = (product, columnKey) => {
    const cellValue = product.attributes[columnKey]
    let description = product.attributes.description

    switch (columnKey) {
      case 'name':
        return (
          <div className='flex items-center gap-2'>
            <p className='text-lg font-semibold'>
              {product.attributes.name.charAt(0).toUpperCase() + product.attributes.name.slice(1)}
            </p>
          </div>
        )
      case 'description':
        if (description.length > 80) {
          description = description.substring(0, 80) + '...'
        }
        return (
          <div className='flex items-center gap-2'>
            <p className='text-lg font-semibold'>{description}</p>
          </div>
        )

      case 'price':
        return <p className='text-lg font-semibold'>{product.attributes.price}€</p>
      case 'artisan':
        return (
          <div className='flex items-center gap-2'>
            <p className='text-lg font-semibold'>
              {product.attributes.artisan.data.attributes.name.charAt(0).toUpperCase() + product.attributes.artisan.data.attributes.name.slice(1)}
            </p>
          </div>
        )
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <span onClick={() => handleGoToProductPage(product.attributes.artisan.data.attributes.slug)} className='text-lg text-primary cursor-pointer active:opacity-50'>
              <EyeIcon />
            </span>

            <span onClick={() => deleteFromCart(product.id)} className='text-lg text-danger cursor-pointer active:opacity-50'>
              <DeleteIcon />
            </span>
          </div>
        )
      default:
        return cellValue
    }
  }

  return (
    <div className='container mx-auto flex flex-col items-center justify-center mt-10 gap-10'>
      <p className='text-2xl font-semibold'>Mon panier</p>
      <Table className='px-24' aria-label='Mon panier' isStriped>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={cart} emptyContent='Votre panier est vide.'>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Cart
