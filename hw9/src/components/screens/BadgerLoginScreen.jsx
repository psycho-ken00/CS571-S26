import { useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

function BadgerLoginScreen(props) {
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");

    return <View style={styles.container}>
        <Text style={styles.title}>BadgerChat Login</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#C7C7CC"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
        />

        <Text style={styles.label}>PIN</Text>
        <TextInput
            style={styles.input}
            placeholder="PIN"
            placeholderTextColor="#C7C7CC"
            keyboardType="number-pad"
            maxLength={7}
            secureTextEntry={true}
            value={pin}
            onChangeText={setPin}
        />

        <Pressable style={styles.loginButton} onPress={() => props.handleLogin(username, pin)}>
            <Text style={styles.loginText}>Login</Text>
        </Pressable>

        <Text style={styles.newHere}>New here?</Text>

        <View style={styles.rowButtons}>
            <Pressable style={styles.secondaryButton} onPress={() => props.setIsRegistering(true)}>
                <Text style={styles.secondaryText}>Signup</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => props.setIsGuest(true)}>
                <Text style={styles.secondaryText}>Continue As Guest</Text>
            </Pressable>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        marginBottom: 32,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 13,
        color: '#6C6C70',
        marginBottom: 4,
        marginLeft: 4,
    },
    input: {
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#8B0000',
        borderRadius: 10,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    loginText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    newHere: {
        color: '#6C6C70',
        fontSize: 14,
        marginTop: 20,
        marginBottom: 8,
    },
    rowButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    secondaryButton: {
        backgroundColor: '#E5E5EA',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    secondaryText: {
        color: '#3C3C43',
        fontSize: 14,
        fontWeight: '500',
    }
});

export default BadgerLoginScreen;