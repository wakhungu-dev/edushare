'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark, FaEye, FaArrowDown } from 'react-icons/fa';

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
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        p: 3,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 6,
        },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Chip
          label={category}
          color="primary"
          size="small"
          sx={{ borderRadius: '999px', fontWeight: 600, px: 1.5, py: 0.5 }}
        />
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color={isBookmarked ? 'primary' : 'default'}>
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </IconButton>
          <IconButton size="small" color={isLiked ? 'error' : 'default'}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </IconButton>
        </Stack>
      </Box>

      {/* Content */}
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
      </Box>

      {/* Tags */}
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
        {tags.map((tag, idx) => (
          <Chip
            key={idx}
            label={tag}
            size="small"
            variant="outlined"
            sx={{ borderRadius: '999px', fontSize: 12, mb: 0.5 }}
          />
        ))}
      </Stack>

      {/* Footer */}
      <Box display="flex" justifyContent="space-between" alignItems="center" pt={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar src={authorAvatar} alt={author} sx={{ width: 28, height: 28 }} />
          <Box>
            <Typography variant="caption" fontWeight={500}>
              {author}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {uploadDate}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" color="text.secondary">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <FaEye size={14} />
            <Typography variant="caption">{views}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <FaHeart size={13} />
            <Typography variant="caption">{likes}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <FaArrowDown size={13} />
            <Typography variant="caption">{downloads}</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Action Button */}
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ borderRadius: 2, mt: 2, alignSelf: 'flex-end' }}
        startIcon={<FaArrowDown />}
      >
        Download Resource
      </Button>
    </Paper>
  );
}