import { useState, useEffect } from "react";
import { Alert, Button, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import BadgerChatMessage from '../helper/BadgerChatMessage';
import CS571 from '@cs571/mobile-client';
import * as SecureStore from 'expo-secure-store';

function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isPosting, setIsPosting] = useState(false); // hide or show the post message modal
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [currentUser, setCurrentUser] = useState(''); // store the current user's username

    function loadMessages() {
        setIsRefreshing(true);
        fetch(`https://cs571api.cs.wisc.edu/rest/s26/hw9/messages?chatroom=${props.name}`, {
            headers: { 'X-CS571-ID': CS571.getBadgerId() }
        })
            .then(res => res.json())
            .then(data => {
                setMessages(data.messages);      // need to be verified 
                setIsRefreshing(false);
            });
    }

    useEffect(() => {
        loadMessages();

        SecureStore.getItemAsync('jwt').then(jwt => {
            fetch('https://cs571api.cs.wisc.edu/rest/s26/hw9/whoami', {
                headers: {
                    'X-CS571-ID': CS571.getBadgerId(),
                    'Authorization': `Bearer ${jwt}`
                }
            })
            .then(res => res.json())
            .then(data => setCurrentUser(data.user.username));
        });
    }, []);

    async function createPost() {
        const jwt = await SecureStore.getItemAsync('jwt');
        const res = await fetch(`https://cs571api.cs.wisc.edu/rest/s26/hw9/messages?chatroom=${props.name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CS571-ID': CS571.getBadgerId(),
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({ title: postTitle, content: postContent })
        });
        
        if (res.status === 200) {
            Alert.alert("Message posted successfully!");
            setIsPosting(false);
            setPostTitle("");
            setPostContent("");
            loadMessages(); // refresh the message list to show the new post
        } else {
            Alert.alert("Failed to post message. Please try again.");
        }
    }

    async function deletePost(id) {
        const jwt = await SecureStore.getItemAsync('jwt');
        const res = await fetch(`https://cs571api.cs.wisc.edu/rest/s26/hw9/messages?id=${id}`, {
            method: 'DELETE',
            headers: {
                'X-CS571-ID': CS571.getBadgerId(),
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (res.status === 200) {
            Alert.alert("Your post has been deleted successfully!");
            loadMessages(); // refresh the message list to show the updated posts
        } else {
            Alert.alert("Failed to delete message. Please try again.");
        }
    }

    return <View style={{ flex:1 }}>
        
        <Modal visible={isPosting} animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Create A Post</Text>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    placeholder="Title"
                    placeholderTextColor="#C7C7CC"
                    style={styles.modalInput}
                    value={postTitle}
                    onChangeText={setPostTitle}
                />
                <Text style={styles.label}>Body</Text>
                <TextInput
                    placeholder="Body"
                    placeholderTextColor="#C7C7CC"
                    style={[styles.modalInput, { height: 120 }]}
                    value={postContent}
                    onChangeText={setPostContent}
                    multiline
                />
                <View style={styles.modalButtons}>
                    <Pressable
                        style={[styles.modalPrimary, (!postTitle || !postContent) && { opacity: 0.4 }]}
                        onPress={createPost}
                        disabled={!postTitle || !postContent}
                    >
                        <Text style={styles.modalPrimaryText}>Create Post</Text>
                    </Pressable>
                    <Pressable style={styles.modalSecondary} onPress={() => {
                        setIsPosting(false);
                        setPostTitle("");
                        setPostContent("");
                    }}>
                        <Text style={styles.modalSecondaryText}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>

        <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <BadgerChatMessage 
                    title={item.title}
                    poster={item.poster}
                    content={item.content}
                    created={item.created}
                >
                    {item.poster === currentUser && (
                        <Pressable style={styles.deleteBar} onPress={() => deletePost(item.id)}>
                            <Text style={styles.deleteText}>Delete Post</Text>
                        </Pressable>
                    )}
                </BadgerChatMessage>

            )}
            refreshing={isRefreshing}
            onRefresh={loadMessages}
        />

        {!props.isGuest && (
            <Pressable style={styles.addPostBar} onPress={() => setIsPosting(true)}>
                <Text style={styles.addPostText}>Add Post</Text>
            </Pressable>
        )}
    </View>
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        padding: 24,
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        fontSize: 13,
        color: '#6C6C70',
        marginBottom: 4,
        marginLeft: 4,
    },
    modalInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
        justifyContent: 'center',
    },
    modalPrimary: {
        backgroundColor: '#8B0000',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 24,
    },
    modalPrimaryText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 15,
    },
    modalSecondary: {
        backgroundColor: '#E5E5EA',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    modalSecondaryText: {
        color: '#3C3C43',
        fontWeight: '500',
        fontSize: 15,
    },
    addPostBar: {
        backgroundColor: '#8B0000',
        paddingVertical: 16,
        alignItems: 'center',
    },
    addPostText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    deleteBar: {
        backgroundColor: 'crimson',
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    }
});

export default BadgerChatroomScreen;