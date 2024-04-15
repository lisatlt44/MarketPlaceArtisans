import { Card, CardBody, CardHeader, Link } from '@nextui-org/react'
import PropTypes from 'prop-types'

function ArtisansListItem ({ artisan }) {
  const { name, description, slug, profilePicture } = artisan.attributes
  const imgUrl = process.env.REACT_APP_IMAGES_URL + profilePicture?.data?.attributes?.url
  return (
    <Card as={Link} className='max-w-[400px] min-h-[500px] flex flex-col flex-grow' href={`/artisans/${slug}`}>
      <CardHeader className='p-0'>
        <img
          src={imgUrl}
        />
      </CardHeader>
      <CardBody className='flex flex-col gap-4'>
        <h3 className='font-semibold text-3xl'>{name}</h3>
        <p>{description.substring(0, 140)}...</p>
      </CardBody>
    </Card>
  )
}

ArtisansListItem.propTypes = {
  artisan: PropTypes.object
}

export default ArtisansListItem
