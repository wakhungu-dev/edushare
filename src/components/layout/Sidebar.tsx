// 'use client';

// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   List, 
//   ListItem, 
//   ListItemButton, 
//   ListItemIcon, 
//   ListItemText,
//   Typography,
//   Divider,
//   Badge,
//   Collapse,
//   IconButton,
//   useTheme,
//   alpha
// } from '@mui/material';
// import {
//   Home,
//   LibraryBooks,
//   Favorite,
//   Collections,
//   TrendingUp,
//   Group,
//   Settings,
//   HelpOutline,
//   ExpandLess,
//   ExpandMore,
//   School,
//   Science,
//   Computer,
//   Palette,
//   Business,
//   Language,
//   Psychology,
//   Engineering
// } from '@mui/icons-material';
// import { useRouter, usePathname } from 'next/navigation';
// // import { categoryService } from '@/lib/supabase/categories';
// // import { statsService } from '@/lib/supabase/stats';

// interface SidebarItemProps {
//   icon: React.ReactNode;
//   label: string;
//   path?: string;
//   isActive?: boolean;
//   badge?: string | number;
//   onClick?: () => void;
//   children?: React.ReactNode;
//   hasSubmenu?: boolean;
//   isExpanded?: boolean;
//   onToggle?: () => void;
// }

// function SidebarItem({ 
//   icon, 
//   label, 
//   path, 
//   isActive = false, 
//   badge, 
//   onClick, 
//   children,
//   hasSubmenu = false,
//   isExpanded = false,
//   onToggle
// }: SidebarItemProps) {
//   const theme = useTheme();
//   const router = useRouter();

//   const handleClick = () => {
//     if (hasSubmenu && onToggle) {
//       onToggle();
//     } else if (path) {
//       router.push(path);
//     } else if (onClick) {
//       onClick();
//     }
//   };

//   return (
//     <>
//       <ListItem disablePadding>
//         <ListItemButton
//           onClick={handleClick}
//           sx={{
//             borderRadius: 2,
//             mb: 0.5,
//             backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
//             color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
//             '&:hover': {
//               backgroundColor: alpha(theme.palette.primary.main, 0.05),
//             },
//             transition: 'all 0.2s ease-in-out',
//           }}
//         >
//           <ListItemIcon
//             sx={{
//               color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
//               minWidth: 40,
//             }}
//           >
//             {icon}
//           </ListItemIcon>
//           <ListItemText 
//             primary={label}
//             primaryTypographyProps={{
//               fontSize: '0.875rem',
//               fontWeight: isActive ? 600 : 500,
//             }}
//           />
//           {badge && (
//             <Badge 
//               badgeContent={badge} 
//               color="primary" 
//               sx={{ 
//                 '& .MuiBadge-badge': { 
//                   fontSize: '0.75rem',
//                   height: 18,
//                   minWidth: 18,
//                 }
//               }}
//             />
//           )}
//           {hasSubmenu && (
//             <IconButton size="small" sx={{ ml: 1 }}>
//               {isExpanded ? <ExpandLess /> : <ExpandMore />}
//             </IconButton>
//           )}
//         </ListItemButton>
//       </ListItem>
//       {hasSubmenu && (
//         <Collapse in={isExpanded} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding sx={{ pl: 2 }}>
//             {children}
//           </List>
//         </Collapse>
//       )}
//     </>
//   );
// }

// interface Category {
//   id: string;
//   name: string;
//   icon: string;
//   color: string;
//   resource_count?: number;
// }

// const categoryIcons: { [key: string]: React.ReactNode } = {
//   'computer': <Computer />,
//   'science': <Science />,
//   'school': <School />,
//   'palette': <Palette />,
//   'business': <Business />,
//   'language': <Language />,
//   'psychology': <Psychology />,
//   'engineering': <Engineering />,
// };

// export default function Sidebar() {
//   const theme = useTheme();
//   const pathname = usePathname();
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [platformStats, setPlatformStats] = useState({
//     totalResources: 0,
//     totalUsers: 0,
//   });
//   const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
//     categories: false,
//     discover: false,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [categoriesResult, statsResult] = await Promise.all([
//         categoryService.getCategoriesWithCount(),
//         statsService.getPlatformStats()
//       ]);

//       if (categoriesResult.data) {
//         setCategories(categoriesResult.data);
//       }
      
//       setPlatformStats(statsResult);
//     } catch (error) {
//       console.error('Error loading sidebar data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleSection = (section: string) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const formatNumber = (num: number) => {
//     if (num >= 1000) {
//       return `${(num / 1000).toFixed(1)}k`;
//     }
//     return num.toString();
//   };

//   return (
//     <Box
//       component="nav"
//       sx={{
//         width: 280,
//         height: 'calc(100vh - 80px)',
//         backgroundColor: theme.palette.background.paper,
//         borderRight: `1px solid ${theme.palette.divider}`,
//         position: 'sticky',
//         top: 80,
//         overflowY: 'auto',
//         p: 2,
//         '&::-webkit-scrollbar': {
//           width: 6,
//         },
//         '&::-webkit-scrollbar-track': {
//           backgroundColor: 'transparent',
//         },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha(theme.palette.text.secondary, 0.2),
//           borderRadius: 3,
//         },
//       }}
//     >
//       <List component="nav" disablePadding>
//         {/* Main Navigation */}
//         <SidebarItem 
//           icon={<Home />} 
//           label="Dashboard" 
//           path="/"
//           isActive={pathname === '/'} 
//         />
//         <SidebarItem 
//           icon={<LibraryBooks />} 
//           label="Browse Resources" 
//           path="/resources"
//           isActive={pathname === '/resources'}
//           badge={loading ? '...' : formatNumber(platformStats.totalResources)}
//         />
//         <SidebarItem 
//           icon={<Favorite />} 
//           label="My Favorites" 
//           path="/favorites"
//           isActive={pathname === '/favorites'}
//         />
//         <SidebarItem 
//           icon={<Collections />} 
//           label="Collections" 
//           path="/collections"
//           isActive={pathname === '/collections'}
//         />

//         <Divider sx={{ my: 2 }} />

//         {/* Categories Section */}
//         <Typography 
//           variant="overline" 
//           sx={{ 
//             px: 2, 
//             py: 1, 
//             color: theme.palette.text.secondary,
//             fontSize: '0.75rem',
//             fontWeight: 600,
//             letterSpacing: 1,
//           }}
//         >
//           Categories
//         </Typography>
        
//         <SidebarItem
//           icon={<LibraryBooks />}
//           label="All Categories"
//           hasSubmenu
//           isExpanded={expandedSections.categories}
//           onToggle={() => toggleSection('categories')}
//         >
//           {loading ? (
//             <SidebarItem
//               icon={<LibraryBooks />}
//               label="Loading..."
//             />
//           ) : (
//             categories.map((category) => (
//               <SidebarItem
//                 key={category.id}
//                 icon={categoryIcons[category.icon] || <LibraryBooks />}
//                 label={category.name}
//                 path={`/resources?category=${category.id}`}
//                 isActive={pathname === `/resources` && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('category') === category.id}
//                 badge={category.resource_count}
//               />
//             ))
//           )}
//         </SidebarItem>

//         <Divider sx={{ my: 2 }} />

//         {/* Discover Section */}
//         <Typography 
//           variant="overline" 
//           sx={{ 
//             px: 2, 
//             py: 1, 
//             color: theme.palette.text.secondary,
//             fontSize: '0.75rem',
//             fontWeight: 600,
//             letterSpacing: 1,
//           }}
//         >
//           Discover
//         </Typography>
        
//         <SidebarItem 
//           icon={<TrendingUp />} 
//           label="Trending" 
//           path="/trending"
//           isActive={pathname === '/trending'}
//           badge="Hot"
//         />
//         <SidebarItem 
//           icon={<Group />} 
//           label="Community" 
//           path="/community"
//           isActive={pathname === '/community'}
//           badge={loading ? '...' : formatNumber(platformStats.totalUsers)}
//         />

//         <Divider sx={{ my: 2 }} />

//         {/* Account Section */}
//         <Typography 
//           variant="overline" 
//           sx={{ 
//             px: 2, 
//             py: 1, 
//             color: theme.palette.text.secondary,
//             fontSize: '0.75rem',
//             fontWeight: 600,
//             letterSpacing: 1,
//           }}
//         >
//           Account
//         </Typography>
        
//         <SidebarItem 
//           icon={<Settings />} 
//           label="Settings" 
//           path="/settings"
//           isActive={pathname === '/settings'}
//         />
//         <SidebarItem 
//           icon={<HelpOutline />} 
//           label="Help & Support" 
//           path="/help"
//           isActive={pathname === '/help'}
//         />
//       </List>
//     </Box>
//   );
// }