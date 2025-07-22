'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { FaBookOpen, FaUsers, FaArrowDown, FaStar } from 'react-icons/fa';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ResourceCard from '@/components/ui/ResourceCard';
import StatsCard from '@/components/ui/StatsCard';
import React from 'react';

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
  function showAllResources(): void {
    throw new Error('Function not implemented.');
  }
  

  return (
    <Box minHeight="100vh" bgcolor="grey.100">
      <Header />

      <Box display="flex">
        <Sidebar />

        <Box flex={1} p={4}>
          <Container maxWidth="lg">
            <Stack spacing={4}>
              {/* Welcome Section */}
              <Paper elevation={0} sx={{ p: 3, mb: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Welcome back, Student! 👋
                </Typography>
                <Typography color="text.secondary" variant="h6">
                  Discover and share amazing learning resources with the community
                </Typography>
              </Paper>

              {/* Stats Cards */}
              <Grid container gap={3}>
                <Grid item xs={12} md={3}>
                  <StatsCard
                    title="Total Resources"
                    value="2,847"
                    icon={FaBookOpen}
                    change="12%"
                    changeType="increase"
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <StatsCard
                    title="Active Users"
                    value="1,234"
                    icon={FaUsers}
                    change="8%"
                    changeType="increase"
                    color="success"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <StatsCard
                    title="Downloads Today"
                    value="456"
                    icon={FaArrowDown}
                    change="23%"
                    changeType="increase"
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <StatsCard
                    title="Your Karma"
                    value="892"
                    icon={FaStar}
                    change="5%"
                    changeType="increase"
                    color="warning"
                  />
                </Grid>
              </Grid>

              {/* Section Header */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
                <Box>
                  <Typography variant="h6" fontWeight="bold" fontcolor="text.primary">
                    Trending Resources
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Most popular resources this week
                  </Typography>
                </Box>
                <Button variant="text" size="small" onClick={showAllResources}>
                  View All
                </Button>
              </Box>

              {/* Resources Grid */}
              <Grid container spacing={3}>
                {sampleResources.map((resource, index) => (
                  <Grid item xs={12} lg={6} key={index}>
                    <ResourceCard
                      {...resource}
                      isLiked={resource.isLiked ?? false}
                      isBookmarked={resource.isBookmarked ?? false}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Load More */}
              <Box display="flex" justifyContent="center" pt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ borderRadius: 3 }}
                  onClick={showAllResources}
                >
                  Load More Resources
                </Button>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

