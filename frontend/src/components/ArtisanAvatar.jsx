import { Avatar } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

function ArtisanAvatar ({ artisan }) {
  const navigate = useNavigate()

  return (
    <div className='w-5/6 flex flex-row items-center gap-4'>
      <Avatar
        onClick={() => navigate(`/artisans/${artisan.data.attributes.slug}`)}
        isBordered
        as='button'
        className='transition-transform'
        color='primary'
        name={artisan?.data?.attributes?.name}
        size='sm'
        src={
          process.env.REACT_APP_IMAGES_URL +
          artisan?.data?.attributes?.profilePicture?.data?.attributes?.formats?.thumbnail?.url
        }
      />
      <p>{artisan?.data?.attributes?.name}</p>
    </div>
  )
}

export default ArtisanAvatar
