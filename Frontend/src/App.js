import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Paper, Container } from '@mui/material';
import LoginPage from './loginpage';
import Navbar from './components/Navbar';
import ProfileDrawer from './components/ProfileDrawer';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [viewMode, setViewMode] = useState('feed'); // 'feed' | 'create-post' | 'my-posts'
  
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  // Fetch all posts globally from all users
  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/posts');
      const data = await res.json();
      // Reverse order so newest posts show up at the top
      setPosts((data.posts || []).reverse());
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  // Fetch only the currently logged-in user's posts
  const fetchMyPosts = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`http://localhost:8000/api/posts/${currentUser.email}`);
      const data = await res.json();
      setMyPosts((data.posts || []).reverse());
    } catch (err) {
      console.error("Failed to fetch user posts:", err);
    }
  };

  // Automatically refresh feed when user logs in or switches view to feed
  useEffect(() => {
    if (currentUser && viewMode === 'feed') {
      fetchPosts();
    }
  }, [currentUser, viewMode]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setViewMode('feed');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewMode('feed');
  };

  const handleCreatePostSubmit = async (e) => {
    e.preventDefault();
    if (!postTitle || !postContent) {
      alert('Title and Content are required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: currentUser.email,
          author_name: currentUser.full_name,
          title: postTitle,
          content: postContent,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error('Failed to create post');

      // PREPEND THE NEW POST TO THE TOP OF THE FEED INSTANTLY
      setPosts((prevPosts) => [data.post, ...prevPosts]);

      setPostTitle('');
      setPostContent('');
      setViewMode('feed');
    } catch (err) {
      alert(err.message);
    }
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Box sx={{ backgroundColor: '#F9F6EE', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        user={currentUser}
        onOpenProfile={() => setIsProfileOpen(true)}
        onNewPost={() => setViewMode('create-post')}
      />

      {/* MAIN CONTENT AREA */}
      <Box sx={{ flex: 1, p: 4, display: 'flex', justifyContent: 'center' }}>
        
        {/* VIEW 1: GLOBAL COMMUNITY FEED */}
        {viewMode === 'feed' && (
          <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>Community Feed 🚀</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#555' }}>
                  Showing posts from all developers in the room
                </Typography>
              </Box>
              <Button variant="contained" onClick={() => setViewMode('create-post')} sx={brutalBtnSx}>+ Create Post</Button>
            </Box>

            {posts.length === 0 ? (
              <Paper elevation={0} sx={brutalCardSx}>
                <Typography sx={{ fontWeight: 700, textAlign: 'center', py: 4 }}>No posts in the room yet. Be the first to post!</Typography>
              </Paper>
            ) : (
              posts.map((p, idx) => (
                <Paper key={idx} elevation={0} sx={brutalCardSx}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>{p.title}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800, backgroundColor: '#F9F6EE', border: '2px solid #000', px: 1, py: 0.5, borderRadius: '6px' }}>
                      @{p.author_name}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', mb: 2, whiteSpace: 'pre-wrap' }}>{p.content}</Typography>
                </Paper>
              ))
            )}
          </Container>
        )}

        {/* VIEW 2: CREATE NEW POST */}
        {viewMode === 'create-post' && (
          <Container maxWidth="sm">
            <Paper elevation={0} sx={{ ...brutalCardSx, p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>Create New Post</Typography>
                <Button onClick={() => setViewMode('feed')} sx={{ fontWeight: 800, color: '#000' }}>Cancel</Button>
              </Box>

              <Box component="form" onSubmit={handleCreatePostSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 1 }}>Post Title *</Typography>
                  <TextField fullWidth placeholder="What's on your mind?" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} size="small" sx={inputSx} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 1 }}>Content / Text *</Typography>
                  <TextField fullWidth multiline rows={4} placeholder="Write your thoughts..." value={postContent} onChange={(e) => setPostContent(e.target.value)} sx={inputSx} />
                </Box>
                <Button type="submit" variant="contained" sx={{ ...brutalBtnSx, mt: 2 }}>Publish Post</Button>
              </Box>
            </Paper>
          </Container>
        )}

        {/* VIEW 3: MY POSTS */}
        {viewMode === 'my-posts' && (
          <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>My Posts 📝</Typography>
              <Button variant="contained" onClick={() => setViewMode('feed')} sx={brutalBtnSx}>← Back to Feed</Button>
            </Box>

            {myPosts.length === 0 ? (
              <Paper elevation={0} sx={brutalCardSx}>
                <Typography sx={{ fontWeight: 700, textAlign: 'center', py: 4 }}>You haven't created any posts yet.</Typography>
              </Paper>
            ) : (
              myPosts.map((p, idx) => (
                <Paper key={idx} elevation={0} sx={brutalCardSx}>
                  <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>{p.title}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', whiteSpace: 'pre-wrap' }}>{p.content}</Typography>
                </Paper>
              ))
            )}
          </Container>
        )}

      </Box>

      <ProfileDrawer
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
        onViewMyPosts={() => {
          fetchMyPosts();
          setViewMode('my-posts');
        }}
      />
    </Box>
  );
}

const brutalCardSx = {
  backgroundColor: '#FFFFFF',
  border: '3px solid #000000',
  boxShadow: '6px 6px 0px #000000',
  borderRadius: '16px',
  padding: '24px',
};

const brutalBtnSx = {
  backgroundColor: '#FF6B55',
  color: '#000000',
  fontWeight: 800,
  textTransform: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  border: '2px solid #000000',
  boxShadow: '4px 4px 0px #000000',
  '&:hover': {
    backgroundColor: '#FF543B',
    boxShadow: '2px 2px 0px #000000',
    transform: 'translate(2px, 2px)',
  },
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F9F6EE',
    borderRadius: '8px',
    border: '2px solid #000000',
    '& fieldset': { border: 'none' },
    '&:hover, &.Mui-focused': { boxShadow: '3px 3px 0px #000000' },
  },
};