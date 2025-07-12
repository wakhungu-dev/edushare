'use client';

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FaMoon, FaSun, FaBell, FaChevronDown, FaSearch } from 'react-icons/fa';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleToggleDarkMode = () => setDarkMode((prev) => !prev);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      color={darkMode ? 'default' : 'primary'}
      sx={{
        bgcolor: darkMode ? 'grey.900' : 'primary.main',
        color: darkMode ? 'grey.100' : 'inherit',
        boxShadow: 2,
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EduShare Hub
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            bgcolor: darkMode ? 'grey.800' : 'grey.100',
            borderRadius: 2,
            px: 2,
            py: 1,
            mx: 3,
            minWidth: 280,
          }}
        >
          <FaSearch color={darkMode ? '#bbb' : '#888'} style={{ marginRight: 8 }} />
          <Typography variant="body2" color="text.secondary">
            Search resources, notes, books...
          </Typography>
        </Box>

        {/* Right Side */}
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton color="inherit" onClick={handleToggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <FaBell />
            </Badge>
          </IconButton>
          <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 2 }}>
            Upload Resource
          </Button>
          <Box>
            <Button
              color="inherit"
              startIcon={<Avatar sx={{ width: 28, height: 28 }} />}
              endIcon={<FaChevronDown />}
              onClick={handleMenuOpen}
              sx={{ textTransform: 'none', borderRadius: 2 }}
            >
              Student
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>My Resources</MenuItem>
              <MenuItem onClick={handleMenuClose}>Collections</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
            </Menu>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}