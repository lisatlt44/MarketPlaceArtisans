import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { useState } from 'react'
import { useAuth } from '../../contexts/authContext.jsx'
import { CartIcon } from '../../assets/icons/CartIcon.jsx'
import { AcmeLogo } from '../../assets/images/AcmeLogo.jsx'

function Header () {
  // État pour gérer l'ouverture/fermeture du menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Récupération des données d'authentification depuis le contexte
  const { state: { isLoggedIn, user }, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className='font-bold text-inherit'>ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link href='/'>
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/dashboard'>
            Tableau de bord
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/artisans'>
            Artisans
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/about'>
            A propos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/services'>
            Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/contact'>
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      {
        isLoggedIn
          ? (
            <NavbarContent as='div' justify='end'>
              <NavbarItem>
                <Button as={Link} color='primary' href='/cart' variant='flat'>
                  <span className='hidden sm:inline'>Mon panier</span> <CartIcon />
                </Button>
              </NavbarItem>
              <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='primary'
                    name='Jason Hughes'
                    size='sm'
                    src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem key='profile' className='h-14 gap-2'>
                    <p className='font-semibold'>Connecté en tant que</p>
                    <p className='font-semibold'>{user.email}</p>
                  </DropdownItem>
                  <DropdownItem key='edit' href='/profile'>
                    Voir mon profil
                  </DropdownItem>
                  <DropdownItem key='logout' color='danger' onPress={handleLogout}>
                    Se déconnecter
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
            )
          : (
            <NavbarContent justify='end'>
              <NavbarItem>
                <Button as={Link} color='primary' href='/authentication' variant='flat'>
                  Se connecter
                </Button>
              </NavbarItem>
            </NavbarContent>
            )
      }

      <NavbarMenu>
        <NavbarMenuItem>
          <Link Link href='/'>
            Accueil
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/dashboard'>
            Tableau de bord
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/artisans'>
            Artisans
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/about'>
            A propos
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/services'>
            Services
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/contact'>
            Contact
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
