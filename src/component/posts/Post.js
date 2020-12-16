import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Header, Icon, List } from "semantic-ui-react";
import './post.css';

export function PostDetails({ details, onBackClick }) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchComments() {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/comments');
            setComments(data.filter(i => i.postId === details.id));
        }
        fetchComments();
    }, [details.id]);

    function CommentsSection({ comments }) {
        return (
            <List divided relaxed>
                {comments.map((comment, index) => (
                    <List.Item key={index}>
                        <List.Icon name='user circle' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header>{comment.name}
                                <a href={comment.email} target='_blank' rel='noreferrer' style={{ float: 'right' }}>{comment.email}</a>
                            </List.Header>
                            <List.Description>{comment.body}</List.Description>
                        </List.Content>
                    </List.Item>
                ))
                }
            </List>
        )
    }

    return (
        <div className='post-details-container'>
            <Header size='large'>Post Details</Header>
            <Header as='h4'>
                <Header.Content>
                    Title
                <Header.Subheader>{details.title}</Header.Subheader>
                </Header.Content>
            </Header>
            <Header as='h4'>
                <Header.Content>
                    UserName
                <Header.Subheader>{details.userName}</Header.Subheader>
                </Header.Content>
            </Header>
            <Header size='large'>Comments</Header>
            <CommentsSection comments={comments}></CommentsSection>
            <Button basic animated onClick={e => onBackClick()}>
                <Button.Content visible>Back</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow left' />
                </Button.Content>
            </Button>
        </div>
    )
}