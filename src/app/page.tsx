'use client';

import { FaBookOpen, FaUsers, FaArrowDown, FaStar } from 'react-icons/fa';
import Header from '@/components/layout/Header';
// import Sidebar from '@/components/layout/Sidebar';
import ResourceCard from '@/components/ui/ResourceCard';
import StatsCard from '@/components/ui/StatsCard';
import React from 'react';

// Sample data (unchanged)
const sampleResources = [/* same as before */
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
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex">
        {/* <Sidebar /> */}

        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-6">
              {/* Welcome Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back, Student! 👋
                </h1>
                <p className="text-gray-600 text-lg">
                  Discover and share amazing learning resources with the community
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  title="Total Resources"
                  value="2,847"
                  icon={FaBookOpen}
                  change="12%"
                  changeType="increase"
                  color="primary"
                />
                <StatsCard
                  title="Active Users"
                  value="1,234"
                  icon={FaUsers}
                  change="8%"
                  changeType="increase"
                  color="success"
                />
                <StatsCard
                  title="Downloads Today"
                  value="456"
                  icon={FaArrowDown}
                  change="23%"
                  changeType="increase"
                  color="secondary"
                />
                <StatsCard
                  title="Your Karma"
                  value="892"
                  icon={FaStar}
                  change="5%"
                  changeType="increase"
                  color="warning"
                />
              </div>

              {/* Section Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Trending Resources
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Most popular resources this week
                  </p>
                </div>
                <button 
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                  onClick={showAllResources}
                >
                  View All
                </button>
              </div>

              {/* Resources Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sampleResources.map((resource, index) => (
                  <ResourceCard
                    key={index}
                    {...resource}
                    isLiked={resource.isLiked ?? false}
                    isBookmarked={resource.isBookmarked ?? false}
                  />
                ))}
              </div>

              {/* Load More */}
              <div className="flex justify-center pt-4">
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200"
                  onClick={showAllResources}
                >
                  Load More Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}