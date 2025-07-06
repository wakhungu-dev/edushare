'use client';

import {
  Box,
  Text,
  Badge,
  Flex,
  Avatar,
  HStack,
  VStack,
  Icon,
//   useColorMode,
  Button,
  IconButton,
  // Square,
} from '@chakra-ui/react';
import { 
  HeartIcon, 
  BookmarkIcon, 
  EyeIcon,
  ArrowDownTrayIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useColorMode } from './color-mode';

interface ResourceCardProps {
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  likes: number;
  views: number;
  downloads: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  uploadDate: string;
}

export default function ResourceCard({
  title,
  description,
  author,
  authorAvatar,
  category,
  tags,
  likes,
  views,
  downloads,
  isLiked = false,
  isBookmarked = false,
  uploadDate
}: ResourceCardProps) {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderRadius="xl"
      border="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      p={6}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        shadow: 'lg',
        borderColor: colorMode === 'light' ? 'gray.300' : 'gray.600'
      }}
    >
      <VStack align="stretch" gap="4">
        {/* Header */}
        <Flex justify="space-between" align="start">
          <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>
            {category}
          </Badge>
          <HStack gap="2">
            <IconButton
              aria-label="Bookmark"
              icon={<BookmarkIcon />}
              size="sm"
              variant="ghost"
              color={isBookmarked ? 'blue.500' : 'gray.400'}
            />
            <IconButton
              aria-label="Like"
              icon={isLiked ? <HeartSolidIcon /> : <HeartIcon />}
              size="sm"
              variant="ghost"
              color={isLiked ? 'red.500' : 'gray.400'}
            />
          </HStack>
        </Flex>

        {/* Content */}
        <VStack align="stretch" gap={3}>
          <Text fontSize="lg" fontWeight="bold" lineHeight="short">
            {title}
          </Text>
          <Text 
            fontSize="sm" 
            color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
            lineHeight="base"
            // noOfLines={2}
          >
            {description}
          </Text>
        </VStack>

        {/* Tags */}
        <Flex wrap="wrap" gap={2}>
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="subtle"
              colorScheme="gray"
              fontSize="xs"
              borderRadius="full"
              px={2}
              py={1}
            >
              {tag}
            </Badge>
          ))}
        </Flex>

        {/* Footer */}
        <Flex justify="space-between" align="center" pt={2}>
          <HStack gap={3}>
            <Avatar size="xs" name={author} src={authorAvatar} />
            <VStack align="start" gap={0}>
              <Text fontSize="xs" fontWeight="medium">
                {author}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {uploadDate}
              </Text>
            </VStack>
          </HStack>

          <HStack gap={4} fontSize="xs" color="gray.500">
            <HStack gap={1}>
              <Icon as={EyeIcon} boxSize={3} />
              <Text>{views}</Text>
            </HStack>
            <HStack gap={1}>
              <Icon as={HeartIcon} boxSize={3} />
              <Text>{likes}</Text>
            </HStack>
            <HStack gap={1}>
              <Icon as={ArrowDownTrayIcon} boxSize={3} />
              <Text>{downloads}</Text>
            </HStack>
          </HStack>
        </Flex>

        {/* Action Button */}
        <Button
          colorScheme="blue"
          size="sm"
          borderRadius="lg"
        >
          <ArrowDownTrayIcon width={16} height={16} style={{ marginRight: 8 }} />
          Download Resource
        </Button>
      </VStack>
    </Box>
  );
}