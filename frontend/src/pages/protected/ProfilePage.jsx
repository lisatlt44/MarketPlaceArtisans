import { useEffect, useState } from 'react'
import { useFetchWithAuth } from '../../hooks/ApiAuth'
import { Button, Input, LinkIcon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { deleteAccount, updateProfile, updateUser } from '../../services/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { useFetch } from '../../hooks/Api'
import { DeleteIcon } from '../../assets/icons/DeleteIcon'
import { EditIcon } from '../../assets/icons/EditIcon'

function ProfilePage () {
  // Récupération des données de l'utilisateur
  const { response, isLoading } = useFetchWithAuth('/users/me?&populate[0]=artisan')

  // Récupération des données des artisans
  const { response: artisanResponse } = useFetch('/artisans?populate=*')

  // État de l'utilisateur
  const [user, setUser] = useState(null)

  // État pour gérer les modales
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure()
  const { isOpen: isLinkAccountModalOpen, onOpen: onOpenLinkAccountModal, onClose: onCloseLinkAccountModal } = useDisclosure()

  // État pour gérer le chargement et la mise à jour du profil
  const [isUpdating, setIsUpdating] = useState(false)

  // Navigation et authentification
  const navigate = useNavigate()
  const { logout } = useAuth()

  // État pour gérer l'artisan sélectionné
  const [selectedArtisan, setSelectedArtisan] = useState('')

  // Mise à jour de l'utilisateur lorsque les données sont chargées
  useEffect(() => {
    if (!isLoading && response) {
      setUser(response)
      if (response.artisan && response.artisan.id) {
        setSelectedArtisan(response.artisan.id)
      }
    }
  }, [isLoading, response])

  // Fonction pour mettre à jour le profil
  const handleUpdateUser = async (updatedUser, userId) => {
    setIsUpdating(true)
    try {
      const response = await updateProfile(updatedUser, userId)
      setUser(response)
      onOpenChange(false)
      toast.success('Votre profil a été modifié avec succès.')
    } catch (error) {
      console.error(error)
      toast.error('Une erreur s\'est produite lors de la modification de votre profil.')
    } finally {
      setIsUpdating(false)
    }
  }

  // Fonction pour lier le compte à un artisan
  const handleLinkAccount = async () => {
    try {
      const updatedUser = await updateUser(selectedArtisan, user.id)
      setUser(updatedUser)
      if (updatedUser.artisan) {
        setSelectedArtisan(updatedUser.artisan.id)
      } else {
        setSelectedArtisan('')
      }
      toast.success('Votre compte a été lié à un artisan avec succès.')
      onCloseLinkAccountModal()
    } catch (error) {
      console.error(error)
      toast.error('Une erreur s\'est produite lors de la liaison de votre compte à un artisan.')
    }
  }

  // Fonction pour supprimer son compte
  const handleDeleteAccount = async (userId) => {
    try {
      await deleteAccount(userId)
      toast.success('Votre compte a été supprimé avec succès.')
      logout()
      navigate('/authentication')
    } catch (error) {
      console.error(error)
      toast.error('Une erreur s\'est produite lors de la suppression de votre compte.')
    }
  }

  // Fonction de confirmation de suppression de son compte
  const handleConfirmDelete = (userId) => {
    handleDeleteAccount(userId)
    onConfirmClose()
  }

  // Définition des colonnes de la table
  const columns = [
    { name: 'Nom & Prénom', uid: 'name' },
    { name: 'Nom d\'utilisateur', uid: 'username' },
    { name: 'Email', uid: 'email' },
    { name: 'Inscrit le', uid: 'createdAt' },
    { name: 'Artisan relié', uid: 'artisan' }
  ]

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <div className='flex items-center gap-2'>
            <p className='text-lg font-semibold'>
              {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}{' '}
              {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
            </p>
          </div>
        )
      case 'username':
        return (
          <div className='flex items-center gap-2'>
            <p className='text-lg font-semibold'>{cellValue}</p>
          </div>
        )
      case 'email':
        return <p className='text-lg font-semibold'>{cellValue}</p>
      case 'createdAt':
        return <p className='text-lg font-semibold'>{new Date(cellValue).toLocaleDateString('fr-FR')}</p>
      case 'artisan':
        return user.artisan
          ? (
            <div className='flex items-center gap-2'>
              <p className='text-lg font-semibold'>
                {user.artisan.name}
              </p>
            </div>
            )
          : (
            <div className='flex items-center gap-2'>
              <p className='text-lg font-semibold'>
                Aucun artisan relié
              </p>
            </div>
            )
      default:
        return cellValue
    }
  }

  return (
    <div className='container mx-auto flex flex-col items-center justify-center mt-10 gap-10'>
      <p className='text-2xl font-semibold'>Mon profil</p>
      <Table className='px-24' aria-label='Mon profil'>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={[user]}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='flex flex-wrap gap-4 mt-4 justify-center'>
        <Button color='primary' size='md' variant='flat' startContent={<EditIcon />} onClick={onOpen}>
          Modifier mon profil
        </Button>
        <Button color='danger' size='md' variant='flat' startContent={<DeleteIcon />} onClick={onConfirmOpen}>
          Supprimer mon compte
        </Button>
        <Button color='primary' size='md' variant='flat' startContent={<LinkIcon />} onClick={onOpenLinkAccountModal}>
          Lier mon compte à un artisan
        </Button>
      </div>
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
                Modifier mon profil
              </ModalHeader>
              <ModalBody>
                <Input
                  clearable
                  bordered
                  fullWidth
                  size='md'
                  label='Prénom'
                  value={user?.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                />
                <Input
                  clearable
                  bordered
                  fullWidth
                  size='md'
                  label='Nom'
                  value={user?.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                />
                <Input
                  clearable
                  bordered
                  fullWidth
                  size='md'
                  label='Pseudo'
                  value={user?.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <Input
                  clearable
                  bordered
                  fullWidth
                  size='md'
                  label='Email'
                  type='email'
                  value={user?.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Annuler
                </Button>
                <Button color='primary' onPress={() => handleUpdateUser(user, user.id)} isLoading={isUpdating}>
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
                Supprimer mon compte
              </ModalHeader>
              <ModalBody>
                Êtes-vous sûr de vouloir supprimer définitivement votre compte ?
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onConfirmClose}>
                  Annuler
                </Button>
                <Button color='primary' onPress={() => handleConfirmDelete(user.id)} isLoading={isUpdating}>
                  Confirmer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isLinkAccountModalOpen}
        onOpenChange={onCloseLinkAccountModal}
        placement={{ sm: 'top-center', xs: 'center' }}
        size='md'
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Lier mon compte à un artisan
              </ModalHeader>
              <ModalBody>
                <Select
                  clearable
                  variant='bordered'
                  fullWidth
                  size='md'
                  label='Artisan'
                  placeholder='Sélectionner un artisan'
                  onChange={(e) => setSelectedArtisan(e.target.value)}
                >
                  {artisanResponse.map((artisan) => (
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
                <Button color='primary' onPress={handleLinkAccount} isLoading={isUpdating}>
                  Confirmer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ProfilePage
