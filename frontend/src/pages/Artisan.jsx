import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/Api'
import ArtisanHeader from '../components/artisan/ArtisanHeader'
import ProductsList from '../components/products/ProductsList'
import { Spinner } from '@nextui-org/react'

function Artisan () {
  // Récupération du slug de l'artisan à partir des paramètres de l'URL
  const { artisanSlug } = useParams()

  // Récupération des données de l'artisan correspondant au slug
  const { response, error, loading } =
  useFetch(`/artisans?filters[slug][$eq]=${artisanSlug}&populate=*`)

  // Récupération des produits de l'artisan correspondant au slug
  const { response: products, error: productsError, loading: productsLoading } =
  useFetch(`/products?filters[artisan][slug][$eq]=${artisanSlug}&populate=*`)

  if (loading || productsLoading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  if (error || productsError) return <pre>{JSON.stringify(error || productsError, null, 2)}</pre>

  return response && (
    <div className='container mx-auto flex flex-col gap-8'>
      <ArtisanHeader attributes={response[0]?.attributes} />
      {
        products
          ? (
            <ProductsList products={products} />
            )
          : <p>Aucun produit trouvé</p>
      }
    </div>
  )
}

export default Artisan
