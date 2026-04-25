/**
 * Register modal. Mirrors LoginModal but also enforces a PIN confirmation
 * field and hits the register endpoint. On success, persists the new
 * username in sessionStorage and signals the parent via `onClose(username)`.
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

/**
 * @param {object} props
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {(username?: string) => void} props.onClose - Called with the
 *   newly-registered username on success, or no argument on cancel/dismiss.
 */
function RegisterModal(props) {
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    // Reset form state whenever the modal (re)opens so stale input/errors
    // don't carry over between attempts.
    useEffect(() => {
        if (props.show) {
            setUsername("");
            setPin("");
            setConfirmPin("");
            setError("");
            setBusy(false);
        }
    }, [props.show]);

    /**
     * Validates the form (username present, 7-digit PIN, matching confirm
     * PIN), POSTs to the register endpoint, and on success persists the
     * username in sessionStorage before signaling the parent via
     * `props.onClose(username)`. Any validation or network failure is
     * surfaced via the local `error` state.
     *
     * @param {React.FormEvent} [e] - Optional form submit event.
     */
    async function handleSubmit(e) {
        e?.preventDefault();
        setError("");

        if (!username.trim()) {
            setError("Username is required.");
            return;
        }
        if (!/^\d{7}$/.test(pin)) {
            setError("PIN must be exactly 7 digits.");
            return;
        }
        if (pin !== confirmPin) {
            setError("PINs do not match.");
            return;
        }

        setBusy(true);
        try {
            const resp = await fetch("https://cs571api.cs.wisc.edu/rest/s26/hw11/chat/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, pin })
            });
            const data = await resp.json();
            if (!resp.ok) {
                setError(data?.msg || "Request failed. Please try again.");
                setBusy(false);
                return;
            }
            sessionStorage.setItem("hw11-logged-in-user", username);
            setBusy(false);
            props.onClose(username);
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setBusy(false);
        }
    }

    return (
        <Modal show={props.show} onHide={() => props.onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="registerUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="registerPin">
                        <Form.Label>7-Digit PIN</Form.Label>
                        <Form.Control
                            type="password"
                            inputMode="numeric"
                            maxLength={7}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="registerConfirmPin">
                        <Form.Label>Confirm 7-Digit PIN</Form.Label>
                        <Form.Control
                            type="password"
                            inputMode="numeric"
                            maxLength={7}
                            value={confirmPin}
                            onChange={(e) => setConfirmPin(e.target.value)}
                        />
                    </Form.Group>
                    {error && <p style={{ color: "red", marginBottom: 0 }}>{error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.onClose()} disabled={busy}>Cancel</Button>
                    <Button type="submit" variant="primary" disabled={busy}>Register</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default RegisterModal;
