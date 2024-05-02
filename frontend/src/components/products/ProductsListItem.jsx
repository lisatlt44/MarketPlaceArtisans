import { Button, Card, CardBody, CardFooter, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import PropTypes from 'prop-types'
import ArtisanAvatar from '../ArtisanAvatar'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { deleteProduct, updateProduct } from '../../services/api'
import { useCart } from '../../contexts/cartContext'
import { useAuth } from '../../contexts/authContext'
import { CartIcon } from '../../assets/icons/CartIcon'
import { DeleteIcon } from '../../assets/icons/DeleteIcon'
import { EditIcon } from '../../assets/icons/EditIcon'

function ProductsListItem ({ product, isDashboard, handleDeleteProductsList, handleUpdateProductsList }) {
  // Récupération de la fonction d'ajout au panier du contexte cartContext
  const { addToCart } = useCart()

  const { name, description, price, images, artisan } = product.attributes
  const imgUrl = images && images.data && images.data[0] && images.data[0].attributes && process.env.REACT_APP_IMAGES_URL + images.data[0].attributes.url
  const showArtisan = artisan && artisan.data && artisan.data.attributes && artisan?.data?.attributes?.profilePicture

  // Récupération du state de la connexion
  const { state: { isLoggedIn } } = useAuth()

  // Définition du state local du produit
  const [productArtisan, setProductArtisan] = useState({
    name,
    description,
    price,
    imgUrl
  })

  // Définition des hooks pour gérer l'ouverture et la fermeture des modales
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure()

  // Définition du state pour gérer la mise à jour et la suppression du produit
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fonction de mise à jour d'un produit
  const handleUpdateProduct = async () => {
    setIsUpdating(true)
    try {
      const requestData = {
        data: {
          name: productArtisan.name,
          description: productArtisan.description,
          price: productArtisan.price
        }
      }

      const response = await updateProduct(requestData, product.id)
      setProductArtisan({
        name: response.data.attributes.name,
        description: response.data.attributes.description,
        price: response.data.attributes.price,
        imgUrl: productArtisan.imgUrl
      })
      onOpenChange(false)
      toast.success('Votre produit a été modifié avec succès')

      handleUpdateProductsList({
        ...product,
        attributes: {
          ...product.attributes,
          name: response.data.attributes.name,
          description: response.data.attributes.description,
          price: response.data.attributes.price
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue lors de la modification du produit')
    } finally {
      setIsUpdating(false)
    }
  }

  // Fonction de suppression d'un produit
  const handleDeleteProduct = async (productId) => {
    setIsDeleting(true)
    try {
      await deleteProduct(productId)
      toast.success('Votre produit a été supprimé avec succès')
      handleDeleteProductsList((prevProducts) =>
        prevProducts && prevProducts.filter((product) => product.id !== productId)
      )
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue lors de la suppression du produit')
    } finally {
      setIsDeleting(false)
    }
  }

  // Fonction de confirmation de suppression d'un produit
  const handleConfirmDelete = () => {
    handleDeleteProduct(product.id)
    onConfirmClose()
  }

  // Fonction d'ajout d'un produit au panier
  const handleAddToCart = () => {
    addToCart(product)
    toast.success('Votre produit a été ajouté au panier avec succès')
  }

  return (
    <>
      <Card className='max-w-[400px] min-h-[600px] flex flex-col flex-grow'>
        <CardHeader className='p-0'>
          <img
            src={productArtisan.imgUrl}
            className='w-full h-[400px] object-cover'
          />
        </CardHeader>
        <CardBody className='flex flex-col gap-4 justify-between'>
          <h3 className='font-semibold text-xl'>{productArtisan.name}</h3>
          <p>{productArtisan.description}</p>
          <p className={`w-${showArtisan ? '1/6' : 'full'} flex justify-end text-right text-xl font-semibold`}>{productArtisan.price} €</p>
        </CardBody>
        <CardFooter className='flex flex-row justify-between items-center'>
          {isLoggedIn && (
            <div className='flex flew-row gap-4'>
              {isDashboard && (
                <>
                  <Button color='primary' size='md' variant='flat' startContent={<EditIcon />} onClick={onOpen} />
                  <Button color='danger' size='md' variant='flat' startContent={<DeleteIcon />} onClick={onConfirmOpen} />
                </>
              )}
              <Button color='primary' size='md' variant='flat' startContent={<CartIcon />} onPress={handleAddToCart} />
            </div>
          )}
          {
            showArtisan &&
              <div>
                <ArtisanAvatar artisan={artisan} />
              </div>
          }
        </CardFooter>
      </Card>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={{ sm: 'top-center', xs: 'center' }}
        size='md'
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Modifier le produit
              </ModalHeader>
              <ModalBody>
                <Input
                  variant='bordered'
                  size='md'
                  label='Nom'
                  value={productArtisan?.name}
                  onChange={(e) => setProductArtisan({ ...productArtisan, name: e.target.value })}
                />
                <Input
                  variant='bordered'
                  size='md'
                  label='Description'
                  value={productArtisan?.description}
                  onChange={(e) => setProductArtisan({ ...productArtisan, description: e.target.value })}
                />
                <Input
                  variant='bordered'
                  size='md'
                  label='Prix'
                  value={productArtisan?.price}
                  onChange={(e) => setProductArtisan({ ...productArtisan, price: parseFloat(e.target.value) })}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Annuler
                </Button>
                <Button color='primary' onPress={handleUpdateProduct} isLoading={isUpdating}>
                  Confirmer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isConfirmOpen}
        onOpenChange={onConfirmClose}
        placement={{ sm: 'top-center', xs: 'center' }}
        size='md'
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Supprimer un produit
              </ModalHeader>
              <ModalBody>
                Êtes-vous sûr de vouloir supprimer définitivement ce produit ?
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onConfirmClose}>
                  Annuler
                </Button>
                <Button color='primary' onPress={() => handleConfirmDelete(product.id)} isLoading={isDeleting}>
                  Confirmer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

ProductsListItem.propTypes = {
  product: PropTypes.object.isRequired,
  isDashboard: PropTypes.bool,
  handleDeleteProductsList: PropTypes.func,
  handleUpdateProductsList: PropTypes.func
}

export default ProductsListItem
