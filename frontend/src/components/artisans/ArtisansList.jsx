import PropTypes from 'prop-types'
import ArtisansListItem from './ArtisansListItem'

function ArtisansList ({ artisans }) {
  // Vérification si la liste des artisans est vide
  if (!artisans || artisans.length < 1) {
    return 'Pas de données'
  }
  return (
    <div className='flex flex-row flex-wrap gap-4 justify-center items-center my-6'>
      {
        artisans.map(artisan => (
          <ArtisansListItem key={artisan.id} artisan={artisan} />
        ))
      }
    </div>
  )
}

ArtisansList.propTypes = {
  artisans: PropTypes.arrayOf(PropTypes.object)
}

export default ArtisansList
