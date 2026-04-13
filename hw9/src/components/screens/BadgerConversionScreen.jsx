import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";

function BadgerConversionScreen(props) {

    return <View style={styles.container}>
        <Text style={styles.title}>Ready to signup?</Text>
        <Text style={styles.subtitle}>Join BadgerChat to be able to make posts!</Text>
        <Pressable style={styles.signupButton} onPress={() => props.handleConversion()}>
            <Text style={styles.signupText}>Signup!</Text>
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
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#6C6C70',
        textAlign: 'center',
        marginBottom: 32,
    },
    signupButton: {
        backgroundColor: '#8B0000',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 40,
    },
    signupText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    }
});

export default BadgerConversionScreen;