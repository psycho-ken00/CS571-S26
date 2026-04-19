import { Pressable, StyleSheet, View } from "react-native";

export default function BadgerCard(props) {
    return <Pressable onPress={props.onPress} onLongPress={props.onLongPress}>
        <View style={[styles.card, props.style]}>
            {props.children}
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,  // Android shadow
    }
})