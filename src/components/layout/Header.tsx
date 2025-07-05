'use client';

import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  useColorMode,
  HStack,
  Avatar,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box 
      as="header" 
      borderBottom="1px" 
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      px={6} 
      py={4}
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
      bg={colorMode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(26, 32, 44, 0.8)'}
    >
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
        {/* Logo */}
        <Flex align="center" gap={3}>
          <Box 
            w={8} 
            h={8} 
            bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontWeight="bold" fontSize="sm">ES</Text>
          </Box>
          <Text fontSize="xl" fontWeight="bold" color={colorMode === 'light' ? 'gray.800' : 'white'}>
            EduShare Hub
          </Text>
        </Flex>

        {/* Search Bar */}
        <Flex 
          flex={1} 
          maxW="md" 
          mx={8}
          bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}
          borderRadius="lg"
          align="center"
          px={4}
          py={2}
        >
          <SearchIcon color="gray.400" mr={3} />
          <Text color="gray.400" fontSize="sm">Search resources, notes, books...</Text>
        </Flex>

        {/* Right Side */}
        <HStack spacing={4}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="sm"
          />
          
          <Box position="relative">
            <IconButton
              aria-label="Notifications"
              icon={<BellIcon />}
              variant="ghost"
              size="sm"
            />
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              colorScheme="red"
              borderRadius="full"
              boxSize="18px"
              fontSize="10px"
            >
              3
            </Badge>
          </Box>

          <Button colorScheme="blue" size="sm" borderRadius="lg">
            Upload Resource
          </Button>

          <Menu>
            <MenuButton as={Button} variant="ghost" size="sm" rightIcon={<ChevronDownIcon />}>
              {/* <HStack spacing={2}> */}
                {/* <Avatar size="sm" name="Student User" src="" /> */}
                <Text fontSize="sm">Student</Text>
              {/* </HStack> */}
            </MenuButton>
            <MenuList>
              <MenuItem value="profile">Profile</MenuItem>
              <MenuItem value="resources">My Resources</MenuItem>
              <MenuItem value="collections">Collections</MenuItem>
              <MenuItem value="settings">Settings</MenuItem>
              <MenuItem value="signout">Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}