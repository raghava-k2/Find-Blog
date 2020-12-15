import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'semantic-ui-react'
import './postlist.css';
export function PostList({ onUserNameClick, onPostClick }) {
    const [postsList, setPosts] = useState([]);
    const [usersList, setUsers] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            const { data: postsList } = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const { data: usersList } = await axios.get('https://jsonplaceholder.typicode.com/users');
            setPosts(postsList);
            setUsers(usersList);
        }
        fetchPosts();
    }, []);
    function getUserName(userId) {
        return usersList.find(user => user.id === userId)?.name;
    }
    function handleUserClick(e, post) {
        const { userId } = post;
        e.preventDefault();
        e.stopPropagation();
        onUserNameClick(usersList.find(user => user.id === userId));
    }
    function handlePostClick(e, post) {
        e.preventDefault();
        onPostClick(post);
    }
    return (
        <Card.Group className='posts-container'>
            {
                postsList.map((post, index) => (
                    <Card key={index} onClick={e => handlePostClick(e, post)}>
                        <Card.Content>
                            <Card.Header>{post.title}</Card.Header>
                            <Card.Meta>
                                <Button className="user-name" onClick={e => handleUserClick(e, post)}>{getUserName(post.userId)}</Button>
                            </Card.Meta>
                            <Card.Description>
                                {post.body}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                ))
            }
        </Card.Group>
    )
}