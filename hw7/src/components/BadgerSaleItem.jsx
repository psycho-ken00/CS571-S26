import { TouchableOpacity, Button, Image, StyleSheet, Text, View } from "react-native";

export default function BadgerSaleItem(props) {
    const { item, quantity, onAdd, onRemove } = props;

    return (
        <View style={styles.card}>
            <Image source={{ uri: item.imgSrc }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text>Price: ${item.price.toFixed(2)}</Text>
            <Text>Max order: {item.upperLimit}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 16 }}>
                {/* <Button title="-" onPress={onRemove} disabled={quantity === 0} />
                <Text style={{ fontSize: 18 }}>{quantity}</Text>
                <Button title="+" onPress={onAdd} disabled={quantity === item.upperLimit} /> */}
                <TouchableOpacity
                    onPress={onRemove}
                    disabled={quantity === 0}
                    style={[styles.btn, quantity === 0 ? styles.btnDisabled : styles.btnActive]}
                >
                    <Text style={styles.btnText}>-</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 18 }}>{quantity}</Text>
                <TouchableOpacity
                    onPress={onAdd}
                    disabled={quantity === item.upperLimit}
                    style={[styles.btn, quantity === item.upperLimit ? styles.btnDisabled : styles.btnActive]}
                >
                    <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        marginVertical: 16
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'cover',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 8
    },
    btn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnActive: {
        backgroundColor: '#2196F3',  // UW Blue
    },
    btnDisabled: {
        backgroundColor: '#BDBDBD',
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});