import React, { use, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';

import TextAppMessageList from './TextAppMessageList';
import Constants from '../constants/Constants';

function TextApp(props) {

    // Set to true to block the user from sending another message
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState(
        JSON.parse(localStorage.getItem("messages")) ?? []
    );
    const inputRef = useRef();

    /**
     * Called when the TextApp initially mounts.
     */
    async function handleWelcome() {
        if (messages.length === 0) {
            addMessage(Constants.Roles.Assistant, props.persona.initialMessage);            
        }
    }

    /**
     * Called whenever the "Send" button is pressed.
     * @param {Event} e default form event; used to prevent from reloading the page.
     */
    async function handleSend(e) {
        e?.preventDefault();
        const input = inputRef.current.value?.trim();


        if(input) {
            setIsLoading(true);
            addMessage(Constants.Roles.User, input);
            inputRef.current.value = "";

            const newMessages = [
                { role: Constants.Roles.Developer, content: props.persona.prompt },
                ...messages,
                { role: Constants.Roles.User, content: input }
            ];

            const response = await fetch("https://cs571api.cs.wisc.edu/rest/s26/hw10/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": import.meta.env.VITE_CS571_BADGER_ID
                },
                body: JSON.stringify(newMessages)
            });
            const data = await response.json();

            addMessage(Constants.Roles.Assistant, data.msg);
            setIsLoading(false);     
        }
        
    }

    /**
     * Adds a message to the ongoing TextAppMessageList
     * 
     * @param {string} role The role of the message; either "user", "assistant", or "developer"
     * @param {*} content The content of the message
     */
    function addMessage(role, content) {
        setMessages(o => [...o, {
            role: role,
            content: content
        }]);
    }

    useEffect(() => {
        handleWelcome();
    }, []);

    useEffect(() => {
        localStorage.setItem("messages", JSON.stringify(messages));
    }, [messages]);

    return (
        <div className="app">
            <TextAppMessageList messages={messages}/>
            {isLoading ? <BeatLoader color="#36d7b7"/> : <></>}
            <div className="input-area">
                <Form className="inline-form" onSubmit={handleSend}>
                    <Form.Control
                        ref={inputRef}
                        style={{ marginRight: "0.5rem", display: "flex" }}
                        placeholder="Type a message..."
                        aria-label='Type and submit to send a message.'
                    />
                    <Button type='submit' disabled={isLoading}>Send</Button>
                </Form>
            </div>
        </div>
    );
}

export default TextApp;
