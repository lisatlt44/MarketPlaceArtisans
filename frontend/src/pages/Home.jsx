import { Spinner } from '@nextui-org/react'
import ProductsList from '../components/products/ProductsList'
import { useFetch } from '../hooks/Api'

function Home () {
  const { response, isLoading, error } =
  useFetch('/products?populate[0]=images&populate[1]=artisan.profilePicture&sort=price:asc')

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
    <div className='container mx-auto flex flex-col items-center justify-start'>
      <h1 className='text-3xl font-semibold'>Home</h1>
      <ProductsList products={response} />
    </div>
  )
}

export default Home
