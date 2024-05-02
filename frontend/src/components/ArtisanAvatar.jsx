import { Avatar, Tooltip } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function ArtisanAvatar ({ artisan }) {
  const navigate = useNavigate()

  return (
    <div className='flex flex-row items-center gap-4'>
      <Tooltip
        content={artisan?.data?.attributes?.name}
        offset={-16}
        closeDelay={1000}
      >
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
      </Tooltip>
    </div>
  )
}

ArtisanAvatar.propTypes = {
  artisan: PropTypes.object.isRequired
}

export default ArtisanAvatar
