import { Spinner } from '@nextui-org/react'
import AddProductForm from '../../components/forms/AddProductForm'
import ProductsList from '../../components/products/ProductsList'
import { useFetch } from '../../hooks/Api'
import { useEffect, useState } from 'react'

function Dashboard () {
  // Récupération des produits depuis l'API
  const { response, isLoading, error } =
  useFetch('/products?populate[0]=images&populate[1]=artisan.profilePicture&sort=price:asc')

  const [productsList, setProductsList] = useState([])

  // Mise à jour de la liste des produits lorsque la réponse change
  useEffect(() => {
    setProductsList(response || [])
  }, [response])

  // Mise à jour de la liste des produits après suppression
  const handleDeleteProductsList = (updatedProductsList) => {
    setProductsList(updatedProductsList)
  }

  // Mise à jour de la liste des produits après modification
  const handleUpdateProductsList = (updatedProduct) => {
    const updatedProductsList = [...productsList]
    const index = updatedProductsList.findIndex(product => product.id === updatedProduct.id)
    updatedProductsList[index] = updatedProduct
    updatedProductsList.sort((a, b) => a.attributes.price - b.attributes.price)
    setProductsList(updatedProductsList)
  }

  if (isLoading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  if (error) {
    return <h2>Une erreur s'est produite</h2>
  }

  return (
    <div className='container mx-auto flex flex-col items-center justify-start mt-6'>
      <div className='flex flex-col gap-4 justify-between items-center mb-6'>
        <h1 className='text-3xl font-semibold text-center'>Tableau de bord</h1>
        <AddProductForm />
      </div>
      <ProductsList products={response} isDashboard handleDeleteProductsList={handleDeleteProductsList} handleUpdateProductsList={handleUpdateProductsList} />
    </div>
  )
}

export default Dashboard
