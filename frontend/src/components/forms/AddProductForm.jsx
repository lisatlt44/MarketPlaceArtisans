import { useState } from 'react'
import { Button, Modal, Input, Textarea, Select, useDisclosure, ModalHeader, ModalBody, ModalFooter, ModalContent, Spinner, SelectItem } from '@nextui-org/react'
import { addProduct } from '../../services/api'
import { toast } from 'react-toastify'
import { useFetch } from '../../hooks/Api'
import { PlusIcon } from '../../assets/icons/PlusIcon'

function AddProductForm () {
  // Récupération des données des artisans depuis l'API
  const { response, error, isLoading } =
  useFetch('/artisans?populate=*')

  // Définition des états pour la gestion de la modal et du formulaire
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [artisanId, setArtisanId] = useState('')
  const [imageFiles, setImageFiles] = useState([])
  const [isLoad, setIsLoad] = useState(false)

  if (isLoading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  // Fonction pour ajouter un produit
  const handleAddProduct = async () => {
    setIsLoad(true)
    const productData = new FormData()
    productData.append('data', JSON.stringify({
      name,
      description,
      price,
      artisan: { id: artisanId }
    }))

    for (let i = 0; i < imageFiles.length; i++) {
      productData.append('files.images', imageFiles[i])
    }

    try {
      await addProduct(productData)
      toast.success('Votre produit a été ajouté avec succès')
      onClose()
      setIsLoad(false)
    } catch (error) {
      console.error(error)
      toast.error('Une erreur s\'est produite lors de l\'ajout de votre produit.')
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        variant='flat'
        color='primary'
        endContent={
          <PlusIcon size={14} />
        }
      >
        Ajouter un produit
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        placement={{ sm: 'top-center', xs: 'center' }}
        size='md'
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                <h3>Ajouter un produit</h3>
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  isRequired
                  label='Nom'
                  placeholder='Nom du produit'
                  variant='bordered'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                  isRequired
                  label='Description'
                  placeholder='Description du produit'
                  variant='bordered'
                  name='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                  isRequired
                  label='Prix'
                  placeholder='Prix du produit'
                  variant='bordered'
                  type='number'
                  name='price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={0}
                />
                <Input
                  isRequired
                  label='Image'
                  placeholder=''
                  variant='bordered'
                  type='file'
                  multiple
                  name='image'
                  onInput={(e) => setImageFiles([...e.target.files])}
                  classNames={{
                    base: [
                      'h-[70px]'
                    ],
                    label: [
                      'mb-[24px]',
                      'text-small'
                    ],
                    inputWrapper: [
                      'h-[70px]'
                    ]
                  }}
                />
                <Select
                  isRequired
                  label='Artisan'
                  placeholder='Sélectionner un artisan'
                  variant='bordered'
                  items={response}
                  value={artisanId}
                  name='artisan'
                  onChange={(e) => setArtisanId(e.target.value)}
                >
                  {response && response.map((artisan) => (
                    <SelectItem key={artisan.id} value={artisan.id}>
                      {artisan.attributes.name}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Annuler
                </Button>
                <Button color='primary' onPress={handleAddProduct} isLoading={isLoad}>
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

export default AddProductForm
