import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import PropTypes from 'prop-types'
import ArtisanAvatar from '../ArtisanAvatar'

function ProductsListItem ({ product }) {
  const { name, description, price, images, artisan } = product.attributes
  const imgUrl = process.env.REACT_APP_IMAGES_URL + images?.data[0]?.attributes?.url
  console.log(artisan.data)
  const showArtisan = artisan && artisan.data && artisan.data.attributes && artisan?.data?.attributes?.profilePicture
  return (
    <Card className='max-w-[400px] min-h-[600px] flex flex-col flex-grow'>
      <CardHeader className='p-0'>
        <img
          src={imgUrl}
        />
      </CardHeader>
      <CardBody className='flex flex-col gap-4 justify-between'>
        <h3 className='font-semibold text-xl'>{name}</h3>
        <p>{description}</p>
      </CardBody>
      <CardFooter className='flex flex-row justify-between'>
        {
          showArtisan && <ArtisanAvatar artisan={artisan} />
        }
        <p className={`w-${showArtisan ? '1/6' : 'full'} flex justify-end text-right text-xl font-semibold`}>{price} €</p>
      </CardFooter>
    </Card>
  )
}

ProductsListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductsListItem
