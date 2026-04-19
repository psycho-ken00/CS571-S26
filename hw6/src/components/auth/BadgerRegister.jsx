import React, {useState, useContext} from 'react';
import { Form, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerRegister() {

    // TODO Create the register component.
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    const handleRegister = () => {
        // empty username or pin check
        if (!username || !pin) {
            alert("You must provide both a username and pin!");
            return;
        }
        // pin format check (7-digit number)
        if (!/^\d{7}$/.test(pin) || !/^\d{7}$/.test(confirmPin)) {
            alert("Your pin must be a 7-digit number!");
            return;
        }
        // pin match check
        if (pin !== confirmPin) {
            alert("Your pins do not match!");
            return;
        }

        fetch('https://cs571api.cs.wisc.edu/rest/s26/hw6/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CS571-ID': CS571.getBadgerId(),
            },
            body: JSON.stringify({ username, pin })
        }).then(res => {
            if (res.status === 409) {
                alert("That username has already been taken!");
            } else if (res.ok) {
                res.json().then(json => {
                    alert("You have successfully registered!");
                    const status = { username: json.user.username };
                    setLoginStatus(status);
                    sessionStorage.setItem("loginStatus", JSON.stringify(status));
                    navigate("/");
                });
            }
        });
    };


    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor="reg-username">Username</Form.Label>
            <Form.Control 
                id="reg-username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            
            <Form.Label htmlFor="reg-pin">Pin</Form.Label>
            <Form.Control
                id="reg-pin"
                type="password"
                value={pin}
                onChange={e => setPin(e.target.value)}
            />

            <Form.Label htmlFor="reg-confirm-pin">Confirm Pin</Form.Label>
            <Form.Control
                id="reg-confirm-pin"
                type="password"
                value={confirmPin}
                onChange={e => setConfirmPin(e.target.value)}
            />

            <Button onClick={handleRegister}>Register</Button>
        </Form>
    </>
}
