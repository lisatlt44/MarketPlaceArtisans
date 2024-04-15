import PropTypes from 'prop-types'
import ProductsListItem from './ProductsListItem'
/**
 *
 * @param {Array} products
 * @returns {React.Component} ProductList
 */
function ProductsList ({ products }) {
  if (!products || products.length < 1) return 'No data'
  return (
    <div className='flex flex-row flex-wrap gap-4 justify-center items-center my-6'>
      {
        products.map(product => (
          <ProductsListItem key={product.id} product={product} />
        ))
      }
    </div>
  )
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

export default ProductsList
