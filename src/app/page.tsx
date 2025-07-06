'use client';

import { 
  Box, 
  Container, 
  // Grid, 
  // GridItem, 
  Text, 
  VStack, 
  // HStack,
  SimpleGrid,
  Flex,
  Button,
  // useColorMode
} from '@chakra-ui/react';
import { useColorMode } from '@/components/ui/color-mode';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ResourceCard from '@/components/ui/ResourceCard';
import StatsCard from '@/components/ui/StatsCard';
import { 
  BookOpenIcon, 
  UsersIcon, 
  ArrowDownTrayIcon,
  StarIcon 
} from '@heroicons/react/24/outline';

// Sample data
const sampleResources = [
  {
    title: "Advanced React Patterns & Best Practices",
    description: "Comprehensive guide covering advanced React patterns including render props, higher-order components, and custom hooks with real-world examples.",
    author: "Sarah Chen",
    category: "Programming",
    tags: ["React", "JavaScript", "Frontend", "Patterns"],
    likes: 234,
    views: 1520,
    downloads: 89,
    isLiked: true,
    uploadDate: "2 days ago"
  },
  {
    title: "Machine Learning Fundamentals",
    description: "Complete introduction to machine learning concepts, algorithms, and practical implementations using Python and scikit-learn.",
    author: "Dr. Michael Rodriguez",
    category: "Data Science",
    tags: ["ML", "Python", "AI", "Statistics"],
    likes: 189,
    views: 2340,
    downloads: 156,
    uploadDate: "1 week ago"
  },
  {
    title: "Calculus III Study Notes",
    description: "Detailed study notes covering multivariable calculus, vector fields, and surface integrals with solved examples.",
    author: "Emma Thompson",
    category: "Mathematics",
    tags: ["Calculus", "Math", "Study Notes", "Examples"],
    likes: 145,
    views: 890,
    downloads: 67,
    isBookmarked: true,
    uploadDate: "3 days ago"
  },
  {
    title: "UI/UX Design Principles",
    description: "Essential design principles for creating intuitive user interfaces and exceptional user experiences in digital products.",
    author: "Alex Kim",
    category: "Design",
    tags: ["UI", "UX", "Design", "Principles"],
    likes: 298,
    views: 1890,
    downloads: 123,
    uploadDate: "5 days ago"
  }
];

export default function Home() {
  const { colorMode } = useColorMode();

  return (
    <Box minH="100vh" bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
      <Header />
      
      <Flex>
        <Sidebar />
        
        <Box flex={1} p={8}>
          <Container maxW="6xl">
            <VStack gap={8} align="stretch">
              {/* Welcome Section */}
              <Box>
                <Text fontSize="2xl" fontWeight="bold" mb={2}>
                  Welcome back, Student! 👋
                </Text>
                <Text color="gray.600" fontSize="lg">
                  Discover and share amazing learning resources with the community
                </Text>
              </Box>

              {/* Stats Cards */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                <StatsCard
                  title="Total Resources"
                  value="2,847"
                  icon={BookOpenIcon}
                  change="12%"
                  changeType="increase"
                  color="blue"
                />
                <StatsCard
                  title="Active Users"
                  value="1,234"
                  icon={UsersIcon}
                  change="8%"
                  changeType="increase"
                  color="green"
                />
                <StatsCard
                  title="Downloads Today"
                  value="456"
                  icon={ArrowDownTrayIcon}
                  change="23%"
                  changeType="increase"
                  color="purple"
                />
                <StatsCard
                  title="Your Karma"
                  value="892"
                  icon={StarIcon}
                  change="5%"
                  changeType="increase"
                  color="orange"
                />
              </SimpleGrid>

              {/* Section Header */}
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    Trending Resources
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    Most popular resources this week
                  </Text>
                </Box>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Flex>

              {/* Resources Grid */}
              <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
                {sampleResources.map((resource, index) => (
                  <ResourceCard key={index} {...resource} />
                ))}
              </SimpleGrid>

              {/* Load More */}
              <Flex justify="center" pt={4}>
                <Button colorScheme="blue" size="lg" borderRadius="xl">
                  Load More Resources
                </Button>
              </Flex>
            </VStack>
          </Container>
        </Box>
      </Flex>
    </Box>
  );
}