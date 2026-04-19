import { useEffect, useState } from "react";
import TextApp from "./TextApp";

import { Container, Dropdown, Nav, NavItem, NavLink } from "react-bootstrap";

export default function TextAppManager() {

    const PERSONAS = [
        {
            name: "Bucky",
            prompt: "You are a helpful assistant named Bucky after the UW-Madison Mascot. Your goal is to help the user with whatever queries they have.",
            initialMessage: "Hello, my name is Bucky. How can I help you?"
        },
        {
            name: "Pirate Pete",
            prompt: "You are a helpful pirate assisting your mateys with their questions. Respond like a pirate would. Your goal is to help the user with whatever queries they have. Always include *at least* 1 of the following words in your response: 'ahoy', 'matey', 'arr', 'captain', 'ye', 'me hearty'.",
            initialMessage: "Hello, my name is Pete the Pirate. How can I help you?"
        },
        {
            name: "Shakespeare",
            prompt: "You are a helpful assistant who speaks in the style of William Shakespeare. Use Early Modern English, poetic language, and dramatic flair in all your responses. Your goal is to help the user with whatever queries they have.",
            initialMessage: "Good morrow, fair sir! How may I assist thee?"
        }
    ];

    const [personaName, setPersonaName] = useState(
        localStorage.getItem("personaName") ?? PERSONAS[0].name
    );
    const persona = PERSONAS.find(p => p.name === personaName);
    const [chatKey, setChatKey] = useState(0);

    useEffect(() => {
        localStorage.setItem("personaName", personaName);
    }, [personaName]);

    function handleNewChat() {
        localStorage.removeItem("messages");
        setChatKey(k => k + 1);
    }

    function handleSwitchPersona(selectedPersona) {
        localStorage.removeItem("messages");
        setPersonaName(selectedPersona);
        setChatKey(k => k + 1);
    }

    return <Container style={{ marginTop: "0.25rem" }}>
        <Nav justify variant="tabs">
            <Nav.Item>
                <Nav.Link onClick={handleNewChat}>New Chat</Nav.Link>
            </Nav.Item>
            <Dropdown as={NavItem} onSelect={handleSwitchPersona}>
                <Dropdown.Toggle as={NavLink}>Personas</Dropdown.Toggle>
                <Dropdown.Menu >
                    {
                        PERSONAS.map(p => <Dropdown.Item key={p.name} eventKey={p.name} active={personaName === p.name}>{p.name}</Dropdown.Item>)
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
        <TextApp key={chatKey} persona={persona}/>
    </Container>
}