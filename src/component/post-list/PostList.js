import { Card, Button } from 'semantic-ui-react'
import './postlist.css';
export function PostList({ onUserNameClick, onPostClick, posts, users }) {

    function getUserName(userId) {
        return users.find(user => user.id === userId)?.name;
    }

    function handleUserClick(e, post) {
        const { userId } = post;
        e.preventDefault();
        e.stopPropagation();
        onUserNameClick(users.find(user => user.id === userId));
    }

    function handlePostClick(e, post) {
        e.preventDefault();
        onPostClick(Object.assign({}, post, { userName: getUserName(post.userId) }));
    }

    return (
        <Card.Group className='posts-container'>
            {
                posts.map((post, index) => (
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