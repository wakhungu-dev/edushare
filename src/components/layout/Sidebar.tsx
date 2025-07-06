'use client';

import { 
  Box, 
  VStack, 
  Text, 
  Icon, 
  Flex, 
  useColorMode,
  Badge,
  Divider
} from '@chakra-ui/react';
import { 
  HomeIcon, 
  BookOpenIcon, 
  StarIcon, 
  CollectionIcon,
  TrendingUpIcon,
  UserGroupIcon,
  CogIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

interface SidebarItemProps {
  icon: any;
  label: string;
  isActive?: boolean;
  badge?: string;
}

function SidebarItem({ icon, label, isActive = false, badge }: SidebarItemProps) {
  const { colorMode } = useColorMode();
  
  return (
    <Flex
      align="center"
      px={3}
      py={2.5}
      borderRadius="lg"
      cursor="pointer"
      bg={isActive ? (colorMode === 'light' ? 'blue.50' : 'blue.900') : 'transparent'}
      color={isActive ? 'blue.600' : (colorMode === 'light' ? 'gray.700' : 'gray.300')}
      _hover={{
        bg: colorMode === 'light' ? 'gray.50' : 'gray.700',
        color: colorMode === 'light' ? 'gray.900' : 'white'
      }}
      transition="all 0.2s"
      justify="space-between"
      w="full"
    >
      <Flex align="center" gap={3}>
        <Icon as={icon} boxSize={5} />
        <Text fontSize="sm" fontWeight={isActive ? 'semibold' : 'medium'}>
          {label}
        </Text>
      </Flex>
      {badge && (
        <Badge colorScheme="blue" size="sm" borderRadius="full">
          {badge}
        </Badge>
      )}
    </Flex>
  );
}

export default function Sidebar() {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="nav"
      w="64"
      h="calc(100vh - 80px)"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderRight="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      p={4}
      position="sticky"
      top="80px"
      overflowY="auto"
    >
      <VStack spacing={1} align="stretch">
        <SidebarItem icon={HomeIcon} label="Dashboard" isActive />
        <SidebarItem icon={BookOpenIcon} label="Browse Resources" badge="2.1k" />
        <SidebarItem icon={StarIcon} label="My Favorites" />
        <SidebarItem icon={CollectionIcon} label="Collections" badge="5" />
        
        <Divider my={4} />
        
        <Text fontSize="xs" fontWeight="semibold" color="gray.500" px={3} mb={2}>
          DISCOVER
        </Text>
        <SidebarItem icon={TrendingUpIcon} label="Trending" badge="Hot" />
        <SidebarItem icon={UserGroupIcon} label="Community" />
        
        <Divider my={4} />
        
        <Text fontSize="xs" fontWeight="semibold" color="gray.500" px={3} mb={2}>
          ACCOUNT
        </Text>
        <SidebarItem icon={CogIcon} label="Settings" />
        <SidebarItem icon={QuestionMarkCircleIcon} label="Help & Support" />
      </VStack>
    </Box>
  );
}