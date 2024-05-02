import PropTypes from 'prop-types'

function ArtisanHeader ({ attributes }) {
  // Récupération de l'URL de l'image de profil de l'artisan
  const imgUrl =
  process.env.REACT_APP_IMAGES_URL + attributes.profilePicture?.data?.attributes?.url

  return (
    <div className='flex flex-col lg:flex-row gap-4 py-8 px-16 justify-center'>
      <div className='flex flex-col'>
        <img
          src={imgUrl}
          className='rounded-lg'
        />
      </div>
      <div className='flex flex-col text-left gap-6 pt-2'>
        <h1 className='font-bold text-4xl'>{attributes.name}</h1>
        <p>{attributes.description}</p>
      </div>
    </div>
  )
}

ArtisanHeader.propTypes = {
  attributes: PropTypes.object
}

export default ArtisanHeader
