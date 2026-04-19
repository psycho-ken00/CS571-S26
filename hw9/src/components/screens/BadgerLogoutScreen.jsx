import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import * as SecureStore from 'expo-secure-store';

function BadgerLogoutScreen(props) {

    return <View style={styles.container}>
        <Text style={styles.title}>Are you sure you're done?</Text>
        <Text style={styles.subtitle}>Come back soon!</Text>
        <Pressable style={styles.logoutButton} onPress={async () => {
            await SecureStore.deleteItemAsync('jwt');
            props.handleLogout();
        }}>
            <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
    </View>
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
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#6C6C70',
        marginBottom: 32,
    },
    logoutButton: {
        backgroundColor: '#8B0000',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 40,
    },
    logoutText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    }
});

export default BadgerLogoutScreen;