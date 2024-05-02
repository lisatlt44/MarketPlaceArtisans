import { Button, Spinner } from '@nextui-org/react'
import ProductsList from '../components/products/ProductsList'
import { useFetch } from '../hooks/Api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { EyeIcon } from '../assets/icons/EyeIcon'

function Home () {
  // Récupération des données des produits en vedette depuis l'API
  const { response, isLoading, error } =
  useFetch('/products?populate[0]=images&populate[1]=artisan.profilePicture&sort=price:asc&filters[isFeatured][$eq]=true')

  const navigate = useNavigate()
  const [isLoad, setIsLoad] = useState(false)

  const handleGoToDashboardPage = () => {
    setIsLoad(true)
    navigate('/dashboard')
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
        <h1 className='text-3xl font-semibold text-center'>Produits en vedette</h1>
      </div>
      <ProductsList products={response} isDashboard={false} />
      <Button
        color='primary'
        variant='flat'
        onClick={() => handleGoToDashboardPage()}
        className='my-8'
        isLoading={isLoad}
        endContent={
          <EyeIcon size={14} />
        }
      >
        En voir plus
      </Button>
    </div>
  )
}

export default Home
