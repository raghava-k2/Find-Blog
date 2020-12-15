import React, { useState } from 'react';
import { PostList } from './component/post-list/PostList';
import { PostDetails } from './component/posts/Posts';
import { UserProfile } from './component/user/User';
function App() {
  const [currentPage, setPage] = useState('postList');
  const [userDetails, setUserDetails] = useState();
  const [postDetails, setPostDetails] = useState();
  function handleUserNameClick(user) {
    setPage('userProfile');
    setUserDetails(user);
  }
  function handlePostClick(post) {
    setPage('postDetails');
    setPostDetails(post);
  }
  function handleBackClick() {
    setPage('postList');
  }
  return (
    <React.Fragment>
      { currentPage === 'postList' &&
        <PostList onUserNameClick={handleUserNameClick} onPostClick={handlePostClick}></PostList >
      }
      { currentPage === 'userProfile' &&
        <UserProfile details={userDetails} onBackClick={handleBackClick}></UserProfile>
      }
      { currentPage === 'postDetails' &&
        <PostDetails details={postDetails}></PostDetails>
      }
    </React.Fragment>
  );
}

export default App;
