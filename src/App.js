import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { PostList } from './component/post-list/PostList';
import { PostDetails } from './component/posts/Post';
import { UserProfile } from './component/user/User';
import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Search,
  Label
} from 'semantic-ui-react'
import axios from 'axios';
import ReactLogo from './logo.svg';
import './App.css';

export default function App() {

  const [currentPage, setPage] = useState('postList');
  const [userDetails, setUserDetails] = useState();
  const [postDetails, setPostDetails] = useState();
  const [postsList, setPosts] = useState([]);
  const [usersList, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSearchResult] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const { data: postsList } = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const { data: usersList } = await axios.get('https://jsonplaceholder.typicode.com/users');
      setPosts(postsList);
      setUsers(usersList);
    }
    fetchPosts();
  }, []);

  function handleUserNameClick(user) {
    setUserDetails(user);
    setPage('userProfile');
  }

  function handlePostClick(post) {
    setPostDetails(post);
    setPage('postDetails');
  }

  function handleBackClick() {
    setPage('postList');
  }

  function ResultRenderer({ title }) { return (<Label content={title} />); }

  function getUserName(userId) {
    return usersList.find(user => user.id === userId)?.name;
  }

  function handleResultSelect(e, { result }) {
    handlePostClick(Object.assign({}, result, { userName: getUserName(result.userId) }));
  }

  function handleSearchChange(e, data) {
    setLoading(true);
    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const filteredResults = postsList.filter(i => re.test(i.title));
      setLoading(false);
      setSearchResults(filteredResults);
    }, 300)
  }

  return (
    <div className='app-container'>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image size='mini' src={ReactLogo} style={{ marginRight: '1.5em' }} />
          Find-Blog
        </Menu.Item>
          <Menu.Item as='a'>Home</Menu.Item>
          <Menu.Item className="search-field">
            <Search
              loading={loading}
              onResultSelect={handleResultSelect}
              onSearchChange={handleSearchChange}
              resultRenderer={ResultRenderer}
              results={searchResults}
              value={selectedSearchResult}
            />
          </Menu.Item>
        </Container>
      </Menu>

      <Container style={{ marginTop: '7em' }}>
        <React.Fragment>
          {currentPage === 'postList' &&
            <PostList onUserNameClick={handleUserNameClick} onPostClick={handlePostClick}
              posts={postsList} users={usersList}></PostList >
          }
          {currentPage === 'userProfile' &&
            <UserProfile details={userDetails} onBackClick={handleBackClick}></UserProfile>
          }
          {currentPage === 'postDetails' &&
            <PostDetails details={postDetails} onBackClick={handleBackClick}></PostDetails>
          }
        </React.Fragment>
      </Container>

      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign='center'>
          <Grid divided inverted stackable>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Group 1' />
              <List link inverted>
                <List.Item as='a'>Link One</List.Item>
                <List.Item as='a'>Link Two</List.Item>
                <List.Item as='a'>Link Three</List.Item>
                <List.Item as='a'>Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Group 2' />
              <List link inverted>
                <List.Item as='a'>Link One</List.Item>
                <List.Item as='a'>Link Two</List.Item>
                <List.Item as='a'>Link Three</List.Item>
                <List.Item as='a'>Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Group 3' />
              <List link inverted>
                <List.Item as='a'>Link One</List.Item>
                <List.Item as='a'>Link Two</List.Item>
                <List.Item as='a'>Link Three</List.Item>
                <List.Item as='a'>Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as='h4' content='Footer Header' />
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
            </p>
            </Grid.Column>
          </Grid>

          <Divider inverted section />
          <Image centered size='mini' src='/logo.png' />
          <List horizontal inverted divided link size='small'>
            <List.Item as='a' href='#'>
              Site Map
          </List.Item>
            <List.Item as='a' href='#'>
              Contact Us
          </List.Item>
            <List.Item as='a' href='#'>
              Terms and Conditions
          </List.Item>
            <List.Item as='a' href='#'>
              Privacy Policy
          </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  )
}
