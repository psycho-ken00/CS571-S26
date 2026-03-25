import { use, useEffect, useState } from "react";
import { TouchableOpacity, Alert, Button, StyleSheet, Text, View } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";
import CS571 from '@cs571/mobile-client'

export default function BadgerMart(props) {
    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [basket, setBasket] = useState({});
    const totalItems = Object.values(basket).reduce((sum, qty) => sum + qty, 0);
    const totalCost = items.reduce((sum, item) => {
        return sum + (basket[item.name] || 0) * item.price;
    }, 0);

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/s26/hw7/items", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                setItems(data);
                const initialBasket = {};
                data.forEach(item => {
                    initialBasket[item.name] = 0;
                });
                setBasket(initialBasket);
            })
    }, []);

    function handleAddBasket(itemName) {
        setBasket(prev => ({
            ...prev,
            [itemName]: prev[itemName] + 1
        }));
    }

    function handleRemoveBasket(itemName) {
        setBasket(prev => ({
            ...prev,
            [itemName]: prev[itemName] - 1
        }));
    }

    function handlePlaceOrder() {
        Alert.alert(
            "Order Confirmed!",
            `Your order contains ${totalItems} items and costs $${totalCost.toFixed(2)}!`
        );
        const resetBasket = {};
        items.forEach(item => {
            resetBasket[item.name] = 0;
        });
        setBasket(resetBasket);
        setCurrentIndex(0);
    }


    if (items.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Badger Mart!</Text>
                <Text>Loading items...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Badger Mart!</Text>
            <BadgerSaleItem 
                item={items[currentIndex]} 
                quantity={basket[items[currentIndex].name] || 0}
                onAdd={() => handleAddBasket(items[currentIndex].name)}
                onRemove={() => handleRemoveBasket(items[currentIndex].name)}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '60%', marginTop: 12}}>
                {/* <Button
                    title="Previous"
                    onPress={() => setCurrentIndex(i => i - 1)}
                    disabled={currentIndex === 0}
                />
                <Button
                    title="Next"
                    onPress={() => setCurrentIndex(i => i + 1)}
                    disabled={currentIndex === items.length - 1}
                /> */}
                <TouchableOpacity
                    onPress={() => setCurrentIndex(i => i - 1)}
                    disabled={currentIndex === 0}
                    style={[styles.navBtn, currentIndex === 0 ? styles.btnDisabled : styles.btnActive]}
                >
                    <Text style={styles.btnText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setCurrentIndex(i => i + 1)}
                    disabled={currentIndex === items.length - 1}
                    style={[styles.navBtn, currentIndex === items.length - 1 ? styles.btnDisabled : styles.btnActive]}
                >
                    <Text style={styles.btnText}>Next</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 16, alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>Items in basket: {totalItems}</Text>
                <Text style={{ fontSize: 18 }}>Total cost: ${totalCost.toFixed(2)}</Text>
            </View>
            {/* <Button 
                title="Place Order" 
                onPress={handlePlaceOrder} 
                disabled={totalItems === 0} 
                style={{ marginTop: 16 }} 
            /> */}
            <TouchableOpacity
                onPress={handlePlaceOrder}
                disabled={totalItems === 0}
                style={[styles.orderBtn, totalItems === 0 ? styles.btnDisabled : styles.btnActive]}
            >
                <Text style={styles.btnText}>Place Order</Text>
            </TouchableOpacity>
        </View>
    );

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 40
    },
    navBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    orderBtn: {
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 24,
        marginTop: 12,
    },
    btnActive: {
        backgroundColor: '#2196F3',
    },
    btnDisabled: {
        backgroundColor: '#BDBDBD',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});