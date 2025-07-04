'use client';

import {
  Box,
  Text,
  Flex,
  Icon,
  useColorMode,
  VStack
} from '@chakra-ui/react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: any;
  change?: string;
  changeType?: 'increase' | 'decrease';
  color?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  change,
  changeType = 'increase',
  color = 'blue'
}: StatsCardProps) {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderRadius="xl"
      border="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      p={6}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-1px)',
        shadow: 'md'
      }}
    >
      <Flex justify="space-between" align="start">
        <VStack align="start" spacing={3}>
          <Text fontSize="sm" color="gray.500" fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {value}
          </Text>
          {change && (
            <Text
              fontSize="sm"
              color={changeType === 'increase' ? 'green.500' : 'red.500'}
              fontWeight="medium"
            >
              {changeType === 'increase' ? '+' : '-'}{change}
            </Text>
          )}
        </VStack>
        
        <Box
          p={3}
          borderRadius="lg"
          bg={`${color}.50`}
          color={`${color}.500`}
        >
          <Icon as={icon} boxSize={6} />
        </Box>
      </Flex>
    </Box>
  );
}