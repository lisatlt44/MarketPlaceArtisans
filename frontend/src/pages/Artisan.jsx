import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/Api'
import ArtisanHeader from '../components/artisan/ArtisanHeader'
import ProductsList from '../components/products/ProductsList'

function Artisan () {
  const { artisanSlug } = useParams()

  const { response, error, loading } =
  useFetch(`/artisans?filters[slug][$eq]=${artisanSlug}&populate=*`)

  const { response: products, error: productsError, loading: productsLoading } =
  useFetch(`/products?filters[artisan][slug][$eq]=${artisanSlug}&populate=*`)

  if (loading || productsLoading) return <h1>Chargement...</h1>

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
