import { useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [repeatPin, setRepeatPin] = useState("");

    return <View style={styles.container}>
        <Text style={styles.title}>Join BadgerChat!</Text>

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

        <Text style={styles.label}>Confirm PIN</Text>
        <TextInput
            style={styles.input}
            placeholder="Confirm PIN"
            placeholderTextColor="#C7C7CC"
            keyboardType="number-pad"
            maxLength={7}
            secureTextEntry={true}
            value={repeatPin}
            onChangeText={setRepeatPin}
        />

        <View style={styles.rowButtons}>
            <Pressable style={styles.primaryButton} onPress={() => {
                if (!pin) { Alert.alert("Uh oh!", "Please enter a pin"); return; }
                if (pin !== repeatPin) { Alert.alert("Uh oh!", "pins do not match"); return; }
                if (pin.length !== 7) { Alert.alert("Uh oh!", "a pin must be 7 digits"); return; }
                props.handleSignup(username, pin);
            }}>
                <Text style={styles.primaryText}>Signup</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => props.setIsRegistering(false)}>
                <Text style={styles.secondaryText}>Nevermind!</Text>
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
    rowButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    primaryButton: {
        backgroundColor: '#8B0000',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 24,
    },
    primaryText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
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

export default BadgerRegisterScreen;