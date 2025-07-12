'use client';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  change?: string;
  changeType?: 'increase' | 'decrease';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'increase',
  color = 'primary'
}: StatsCardProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        p: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 6,
        },
        bgcolor: 'background.paper',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Stack spacing={1} flex={1}>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
          {change && (
            <Typography
              variant="body2"
              fontWeight={500}
              color={changeType === 'increase' ? 'success.main' : 'error.main'}
            >
              {changeType === 'increase' ? '+' : '-'}
              {change}
            </Typography>
          )}
        </Stack>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: `${color}.100`,
            color: `${color}.main`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ml: 2,
          }}
        >
          <Icon size={28} />
        </Box>
      </Box>
    </Paper>
  );
}