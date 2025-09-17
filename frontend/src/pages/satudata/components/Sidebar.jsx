import React from 'react';
import {
  Box,
  VStack,
  Text,
  Divider,
  Icon,
  Flex,
  useColorModeValue,
  Tooltip,
  Collapse,
} from '@chakra-ui/react';
import {
  FiHome,
  FiUsers,
  FiFile,
  FiDatabase,
  FiSettings,
  FiBarChart2,
  FiUser,
  FiLogOut,
  FiActivity,
  FiGrid,
  FiPackage,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const activeBg = useColorModeValue('teal.500', 'teal.600');
  const activeColor = useColorModeValue('white', 'white');
  const hoverBg = useColorModeValue('teal.100', 'teal.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const submenuBg = useColorModeValue('gray.50', 'gray.700');

  const [openMenus, setOpenMenus] = React.useState({
    'Manajemen Pengguna': true,
    'Manajemen Data': true
  });

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const navItems = [
    {
      title: 'Dashboard',
      icon: FiHome,
      path: '/satudata/dashboard',
    },
    {
      title: 'Manajemen Pengguna',
      icon: FiUsers,
      children: [
        {
          title: 'Daftar Pengguna',
          icon: FiUser,
          path: '/satudata/dashboard/users/register',
        },
        {
          title: 'Hapus Pengguna',
          icon: FiUser,
          path: '/satudata/dashboard/users/delete',
        },
      ],
    },
    {
      title: 'Manajemen Data',
      icon: FiDatabase,
      children: [
        {
          title: 'Upload Data',
          icon: FiFile,
          path: '/satudata/dashboard/data/upload',
        },
        {
          title: 'Edit Data',
          icon: FiFile,
          path: '/satudata/dashboard/data/edit',
        },
        {
          title: 'Semua Data',
          icon: FiGrid,
          path: '/satudata/dashboard/data/all',
        },
      ],
    },
    {
      title: 'Integrasi SIPD',
      icon: FiActivity,
      path: '/satudata/dashboard/integration/sipd',
    },
    {
      title: 'Laporan',
      icon: FiBarChart2,
      path: '/satudata/dashboard/reports',
    },
    {
      title: 'Pengaturan',
      icon: FiSettings,
      path: '/satudata/dashboard/settings',
    },
  ];

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/satudata');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const NavItem = ({ item }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isMenuOpen = openMenus[item.title];
    
    return (
      <Box w="100%">
        <Tooltip label={item.title} placement="right" hasArrow>
          <Flex
            align="center"
            p={3}
            mx={2}
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: hoverBg,
            }}
            bg={isActive(item.path) ? activeBg : 'transparent'}
            color={isActive(item.path) ? activeColor : textColor}
            onClick={() => {
              if (hasChildren) {
                toggleMenu(item.title);
              } else {
                handleNavigation(item.path);
              }
            }}
            fontWeight={isActive(item.path) ? 'bold' : 'normal'}
            transition="all 0.2s ease"
          >
            {item.icon && <Icon mr={3} as={item.icon} boxSize={5} />}
            <Text fontSize="sm" flex={1}>{item.title}</Text>
            {hasChildren && (
              <Icon 
                as={isMenuOpen ? FiChevronDown : FiChevronRight} 
                boxSize={4} 
                transition="transform 0.2s ease"
                transform={isMenuOpen ? "rotate(180deg)" : "rotate(0deg)"}
              />
            )}
          </Flex>
        </Tooltip>
        
        {hasChildren && (
          <Collapse in={isMenuOpen} animateOpacity>
            <VStack align="stretch" pl={4} spacing={1} mt={1}>
              {item.children.map((child, index) => (
                <Tooltip key={index} label={child.title} placement="right" hasArrow>
                  <Flex
                    align="center"
                    p={2}
                    mx={2}
                    borderRadius="md"
                    role="group"
                    cursor="pointer"
                    _hover={{
                      bg: hoverBg,
                    }}
                    bg={isActive(child.path) ? activeBg : submenuBg}
                    color={isActive(child.path) ? activeColor : textColor}
                    onClick={() => handleNavigation(child.path)}
                    fontWeight={isActive(child.path) ? 'semibold' : 'normal'}
                    transition="all 0.2s ease"
                  >
                    {child.icon && <Icon mr={3} as={child.icon} fontSize="sm" boxSize={4} />}
                    <Text fontSize="sm">{child.title}</Text>
                  </Flex>
                </Tooltip>
              ))}
            </VStack>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={bgColor}
      borderRight="1px"
      borderRightColor={borderColor}
      w="240px"
      display={{ base: 'none', md: 'block' }}
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      transition="all 0.3s ease"
    >
      <Flex h="20" alignItems="center" mx="4" justifyContent="flex-start">
        <Text fontSize="2xl" fontWeight="bold" color="teal.500" margin="1rem">
         SatuData PALI
        </Text>
      </Flex>
      
      <Divider my={2} borderColor={borderColor} />
      
      <VStack align="stretch" spacing={1} mt={4} px={2}>
        {navItems.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </VStack>
      
      <Divider my={2} borderColor={borderColor} />
      
      <Tooltip label="Keluar" placement="right" hasArrow>
        <Flex
          align="center"
          p={3}
          mx={2}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: hoverBg,
          }}
          onClick={handleLogout}
          color={textColor}
          position="absolute"
          bottom="20px"
          width="calc(100% - 16px)"
          transition="all 0.2s ease"
        >
          <Icon mr={3} as={FiLogOut} boxSize={5} />
          <Text fontSize="sm">Keluar</Text>
        </Flex>
      </Tooltip>
    </Box>
  );
};

export default Sidebar;