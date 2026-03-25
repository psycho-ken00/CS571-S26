import React, { use, useEffect, useState, useContext } from "react"
import { Form, Button, Row, Col, Pagination } from "react-bootstrap";
import BadgerMessage from "./BadgerMessage";
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [loginStatus] = useContext(BadgerLoginStatusContext);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    const loadMessages = () => {
        fetch(`https://cs571api.cs.wisc.edu/rest/s26/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    const handlePost = () => {
        if (!postTitle || !postContent) {
            alert("You must provide both a title and content!");
            return;
        }

        fetch (`https://cs571api.cs.wisc.edu/rest/s26/hw6/messages?chatroom=${props.name}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            body: JSON.stringify({ title: postTitle, content: postContent })
        }).then(res => {
            if (res.ok) {
                alert("Successfully posted!");
                setPostTitle("");
                setPostContent("");
                loadMessages();
            }
        });
    };

    const handleDelete = (id) => {
        fetch(`https://cs571api.cs.wisc.edu/rest/s26/hw6/messages?id=${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'X-CS571-ID': CS571.getBadgerId()
            }
        }).then(res => {
            if (res.ok) {
                alert("Successfully deleted the post!");
                loadMessages();
            }
        });
    };

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    // useEffect(loadMessages, [props]);
    useEffect(() => {
        setPage(1);
    }, [props.name]);

    useEffect(loadMessages, [props.name, page]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
            loginStatus ? (
                <>
                    <Form.Label htmlFor="post-title">Title</Form.Label>
                    <Form.Control
                        id="post-title"
                        type="text"
                        value={postTitle}
                        onChange={e => setPostTitle(e.target.value)}
                    />
                    <Form.Label htmlFor="post-content">Content</Form.Label>
                    <Form.Control
                        id="post-content"
                        as="textarea"
                        value={postContent}
                        onChange={e => setPostContent(e.target.value)}
                    />
                    <Button onClick={handlePost}>Create Post</Button>
                </>
            ) : (
                <p>You must be logged in to post!</p>
            )
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        /* TODO: Complete displaying of messages. */
                        <Row>
                            {messages.map(msg => (
                                <Col key={msg.id} xs={12} md={6} lg={4}>
                                    <BadgerMessage
                                        title={msg.title}
                                        poster={msg.poster}
                                        content={msg.content}
                                        created={msg.created}
                                        id={msg.id}
                                        isOwner={loginStatus?.username?.toLowerCase() === msg.poster?.toLowerCase()}
                                        onDelete={() => handleDelete(msg.id)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    }
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <Pagination>
            {[1, 2, 3, 4].map(p => (
                <Pagination.Item key={p} active={p === page} onClick={() => setPage(p)}>
                    {p}
                </Pagination.Item>
            ))}
        </Pagination>

    </>
}
