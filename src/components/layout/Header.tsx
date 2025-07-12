'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Button,
  InputAdornment,
  useTheme,
  alpha
} from '@mui/material';
import {
  Search,
  Notifications,
  DarkMode,
  LightMode,
  KeyboardArrowDown,
  Upload
} from '@mui/icons-material';
import { useTheme as useNextTheme } from 'next-themes';
import { useState } from 'react';

export default function Header() {
  const theme = useTheme();
  const { theme: currentTheme, setTheme } = useNextTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', maxWidth: '7xl', width: '100%', mx: 'auto', px: 3 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
              ES
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
            EduShare Hub
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ flex: 1, maxWidth: 'md', mx: 4 }}>
          <TextField
            fullWidth
            placeholder="Search resources, notes, books..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: alpha(theme.palette.action.hover, 0.5),
                borderRadius: 2,
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: `1px solid ${theme.palette.primary.main}`,
                },
              },
            }}
          />
        </Box>

        {/* Right Side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={toggleTheme} size="small">
            {currentTheme === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
          
          <IconButton size="small">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Button
            variant="contained"
            size="small"
            startIcon={<Upload />}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Upload Resource
          </Button>

          <Button
            onClick={handleMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textTransform: 'none',
              color: theme.palette.text.primary,
            }}
            endIcon={<KeyboardArrowDown />}
          >
            <Avatar sx={{ width: 32, height: 32 }} />
            <Typography variant="body2">Student</Typography>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Resources</MenuItem>
            <MenuItem onClick={handleMenuClose}>Collections</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}