'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Avatar,
  IconButton,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Bookmark,
  BookmarkBorder,
  Visibility,
  Download,
  GetApp
} from '@mui/icons-material';

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
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[8],
          borderColor: alpha(theme.palette.primary.main, 0.3),
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Chip
              label={category}
              color="primary"
              size="small"
              sx={{ borderRadius: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                size="small"
                sx={{ color: isBookmarked ? theme.palette.primary.main : theme.palette.text.secondary }}
              >
                {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: isLiked ? theme.palette.error.main : theme.palette.text.secondary }}
              >
                {isLiked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>
          </Box>

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                variant="outlined"
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.text.secondary, 0.05),
                  borderColor: alpha(theme.palette.text.secondary, 0.2),
                }}
              />
            ))}
          </Box>

          {/* Footer */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar
                src={authorAvatar}
                sx={{ width: 24, height: 24 }}
              >
                {author.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 500, display: 'block' }}>
                  {author}
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {uploadDate}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.75rem', color: theme.palette.text.secondary }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Visibility sx={{ fontSize: 14 }} />
                <Typography variant="caption">{views}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Favorite sx={{ fontSize: 14 }} />
                <Typography variant="caption">{likes}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Download sx={{ fontSize: 14 }} />
                <Typography variant="caption">{downloads}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Action Button */}
          <Button
            variant="contained"
            size="small"
            startIcon={<GetApp />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Download Resource
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}