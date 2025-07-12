'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button,
  useTheme
} from '@mui/material';
import {
  MenuBook,
  Group,
  Download,
  Star
} from '@mui/icons-material';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ResourceCard from '@/components/ui/ResourceCard';
import StatsCard from '@/components/ui/StatsCard';

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
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Header />
      
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        
        <Box sx={{ flex: 1, p: 4 }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Welcome Section */}
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Welcome back, Student! 👋
                </Typography>
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                  Discover and share amazing learning resources with the community
                </Typography>
              </Box>

              {/* Stats Cards */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={3}>
                  <StatsCard
                    title="Total Resources"
                    value="2,847"
                    icon={MenuBook}
                    change="12%"
                    changeType="increase"
                    color="blue"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <StatsCard
                    title="Active Users"
                    value="1,234"
                    icon={Group}
                    change="8%"
                    changeType="increase"
                    color="green"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <StatsCard
                    title="Downloads Today"
                    value="456"
                    icon={Download}
                    change="23%"
                    changeType="increase"
                    color="purple"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <StatsCard
                    title="Your Karma"
                    value="892"
                    icon={Star}
                    change="5%"
                    changeType="increase"
                    color="orange"
                  />
                </Grid>
              </Grid>

              {/* Section Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Trending Resources
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Most popular resources this week
                  </Typography>
                </Box>
                <Button variant="text" size="small">
                  View All
                </Button>
              </Box>

              {/* Resources Grid */}
              <Grid container spacing={3}>
                {sampleResources.map((resource, index) => (
                  <Grid item xs={12} lg={6} key={index}>
                    <ResourceCard {...resource} />
                  </Grid>
                ))}
              </Grid>

              {/* Load More */}
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Load More Resources
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}