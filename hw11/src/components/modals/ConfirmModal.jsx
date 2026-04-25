/**
 * Confirmation modal shown before a `create_post` tool call is executed.
 * Pure presentation: receives the proposed post and signals the user's
 * decision via a single `onClose(confirmed)` callback.
 */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

/**
 * @param {object} props
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {{chatroom: string, title: string, content: string} | null} props.post
 *   The post the agent wants to create. May be null when not showing.
 * @param {(confirmed: boolean) => void} props.onClose - Called with `true`
 *   when the user confirms, `false` on cancel or backdrop/X dismissal.
 */
function ConfirmModal(props) {
    const post = props.post;
    return (
        <Modal show={props.show} onHide={() => props.onClose(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create post?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Please review this post before it's published.</p>
                <p><b>Chatroom:</b> {post?.chatroom}</p>
                <p><b>Title:</b> {post?.title}</p>
                <p><b>Content:</b> {post?.content}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onClose(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => props.onClose(true)}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;
