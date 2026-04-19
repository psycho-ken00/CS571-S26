import React, {useRef, useContext} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';


export default function BadgerLogin() {

    // TODO Create the login component.
    const usernameRef = useRef(null);
    const pinRef = useRef(null);
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        const username = usernameRef.current.value;
        const pin = pinRef.current.value;

        // empty username or pin check
        if (!username || !pin) {
            alert("You must provide both a username and pin!");
            return;
        }
        // pin format check (7-digit number)
        if (!/^\d{7}$/.test(pin)) {
            alert("Your pin is not a 7-digit number!");
            return;
        }

        fetch('https://cs571api.cs.wisc.edu/rest/s26/hw6/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CS571-ID': CS571.getBadgerId(),
            },
            body: JSON.stringify({ username, pin })
        }).then(res => {
            if (res.status === 401) {
                alert("Incorrect username or pin!");
            } else if (res.ok) {
                res.json().then(json => {
                    alert("You have been successfully logged in!");
                    const status = { username: json.user.username };
                    setLoginStatus(status);
                    sessionStorage.setItem("loginStatus", JSON.stringify(status));
                    navigate("/");
                });
            }
        });
        };

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label htmlFor="login-username">Username</Form.Label>
            <Form.Control 
                id="login-username"
                type="text"
                ref={usernameRef}
            />
            
            <Form.Label htmlFor="login-pin">Pin</Form.Label>
            <Form.Control
                id="login-pin"
                type="password"
                ref={pinRef}
            />

            <Button onClick={handleLogin}>Login</Button>
        </Form>
    </>
}