'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  alpha
} from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: SvgIconComponent;
  change?: string;
  changeType?: 'increase' | 'decrease';
  color?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'increase',
  color = 'primary'
}: StatsCardProps) {
  const theme = useTheme();

  const getColor = (colorName: string) => {
    switch (colorName) {
      case 'blue': return theme.palette.primary.main;
      case 'green': return theme.palette.success.main;
      case 'purple': return '#8B5CF6';
      case 'orange': return theme.palette.warning.main;
      default: return theme.palette.primary.main;
    }
  };

  const iconColor = getColor(color);

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
            {change && (
              <Typography
                variant="body2"
                sx={{
                  color: changeType === 'increase' 
                    ? theme.palette.success.main 
                    : theme.palette.error.main,
                  fontWeight: 500,
                }}
              >
                {changeType === 'increase' ? '+' : '-'}{change}
              </Typography>
            )}
          </Box>
          
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: alpha(iconColor, 0.1),
              color: iconColor,
            }}
          >
            <Icon sx={{ fontSize: 24 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}