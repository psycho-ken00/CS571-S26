const CS571_BID = import.meta.env.VITE_CS571_BADGER_ID;

// ── Tool Definitions ──────────────────────────────────

const loginToolDef = {
    type: "function",
    name: "login",
    description: "Directs the user to log in using the Login button in the UI.",
    parameters: { type: "object", properties: {} }
};

const registerToolDef = {
    type: "function",
    name: "register",
    description: "Directs the user to register using the Register button in the UI.",
    parameters: { type: "object", properties: {} }
};

const logoutToolDef = {
    type: "function",
    name: "logout",
    description: "Directs the user to log out using the Logout button in the UI.",
    parameters: { type: "object", properties: {} }
};

const whoamiToolDef = {
    type: "function",
    name: "whoami",
    description: "Check whether the user is currently logged in and get their username.",
    parameters: { type: "object", properties: {} }
};

const getChatroomsToolDef = {
    type: "function",
    name: "get_chatrooms",
    description: "Get a list of all available chatrooms.",
    parameters: { type: "object", properties: {} }
};

const getMessagesToolDef = {
    type: "function",
    name: "get_messages",
    description: "Get the most recent messages, optionally filtered by chatroom.",
    parameters: {
        type: "object",
        properties: {
            chatroom: {
                type: "string",
                description: "The chatroom to fetch messages from. If omitted, returns messages across all chatrooms.",
                enum: [
                    "Bascom Hill Hangout",
                    "Memorial Union Meetups",
                    "Witte Whispers",
                    "Chadbourne Chats",
                    "Red Gym Rendezvous",
                    "Babcock Banter",
                    "Humanities Hubbub"
                ]
            },
            n : {
                type: "integer",
                description: "The number of messages to return (1-10). Default is 10."
            }
        }
    }
};

const createPostToolDef = {
    type: "function",
    name: "create_post",
    description: "Create a new post in a chatroom on behalf of the user. Call this tool directly, the app will automatically show a confirmation modal to the user, do NOT ask for confirmation in chat first.",
    parameters: {
        type: "object",
        properties: {
            chatroom: {
                type: "string",
                description: "The chatroom to post in.",
                enum: [
                    "Bascom Hill Hangout",
                    "Memorial Union Meetups",
                    "Witte Whispers",
                    "Chadbourne Chats",
                    "Red Gym Rendezvous",
                    "Babcock Banter",
                    "Humanities Hubbub"
                ]
            },
            title: {
                type: "string",
                description: "The title of the post."
            },
            content: {
                type: "string",
                description: "The body content of the post."
            }
        }
    }
};

// ── Tool Handlers ─────────────────────────────────────

async function handleLogin() {
    return "Please use the Login button at the top of the app to log in. Never share your username or PIN in chat.";
}

async function handleRegister() {
    return "Please use the Register button at the top of the app to create an account. Never share your username or PIN in chat.";
}

async function handleLogout() {
    return "Please use the Logout button at the top of the app to log out.";
}

async function handleWhoami() {
    const resp = await fetch("https://cs571api.cs.wisc.edu/rest/s26/hw11/chat/whoami", {
        headers: { "X-CS571-ID": CS571_BID },
        credentials: "include"
    });
    const data = await resp.json();
    return JSON.stringify(data);
}

async function handleGetChatrooms() {
    const resp = await fetch("https://cs571api.cs.wisc.edu/rest/s26/hw11/chat/chatrooms", {
        headers: { "X-CS571-ID": CS571_BID }
    });
    const data = await resp.json();
    return JSON.stringify(data);
}

async function handleGetMessages(args = {}) {
    const { chatroom, n } = args;
    const limit = Math.min(n ?? 10, 10);

    const url = chatroom
        ? `https://cs571api.cs.wisc.edu/rest/s26/hw11/chat/messages?chatroom=${encodeURIComponent(chatroom)}`
        : "https://cs571api.cs.wisc.edu/rest/s26/hw11/chat/messages";

    const resp = await fetch(url, {
        headers: { "X-CS571-ID": CS571_BID }
    });
    const data = await resp.json();
    const messages = data.messages.slice(0, limit);
    return JSON.stringify(messages);
}

async function handleCreatePost(args, confirmPost) {
    const { chatroom, title, content } = args;

    const confirmed = await confirmPost({ chatroom, title, content });
    if (!confirmed) {
        return "Post creation cancelled by user.";
    }

    const resp = await fetch(
        `https://cs571api.cs.wisc.edu/rest/s26/hw11/chat/messages?chatroom=${encodeURIComponent(chatroom)}`,
        {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571_BID,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ title, content })
        }
    );
    const data = await resp.json();
    return JSON.stringify(data);
}

// ── Exports ───────────────────────────────────────────

export async function getToolDefs() {
    return [
        loginToolDef,
        registerToolDef,
        logoutToolDef,
        whoamiToolDef,
        getChatroomsToolDef,
        getMessagesToolDef,
        createPostToolDef,
    ];
}

export async function callTool(name, args, confirmPost) {
    switch (name) {
        case "login":    return await handleLogin();
        case "register": return await handleRegister();
        case "logout":   return await handleLogout();
        case "whoami":   return await handleWhoami();
        case "get_chatrooms": return await handleGetChatrooms();
        case "get_messages": return await handleGetMessages(args);
        case "create_post": return await handleCreatePost(args, confirmPost);
        default:         return "Unknown tool.";
    }
}
