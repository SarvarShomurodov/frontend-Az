import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { fetchPosts } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts } = useSelector(state => state.posts);
  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [])

  
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="All Projects" />
      </Tabs>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {(isPostsLoading ? Array.from(Array(4)) : posts.items).map((obj, index) => 
          isPostsLoading ? (
          <Post key={index} isLoading={true} /> 
          ) : (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={0}
              isEditable={userData?._id === obj.user._id}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
