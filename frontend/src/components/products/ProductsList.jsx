import PropTypes from 'prop-types'
import ProductsListItem from './ProductsListItem'
/**
 *
 * @param {Array} products
 * @returns {React.Component} ProductList
 */
function ProductsList ({ products, isDashboard, handleDeleteProductsList, handleUpdateProductsList }) {
  // Vérification si la liste des produits est vide
  if (!products || products.length < 1) return 'Pas de données'

  return (
    <div className='flex flex-row flex-wrap gap-4 justify-center items-center my-6'>
      {products.map(product => (
        <ProductsListItem
          key={product.id}
          product={product}
          isDashboard={isDashboard}
          handleDeleteProductsList={handleDeleteProductsList}
          handleUpdateProductsList={handleUpdateProductsList}
        />
      ))}
    </div>
  )
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  isDashboard: PropTypes.bool,
  handleDeleteProductsList: PropTypes.func,
  handleUpdateProductsList: PropTypes.func
}

export default ProductsList
