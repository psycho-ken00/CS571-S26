import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import BadgerMart from './src/components/BadgerMart';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['left', 'right', 'top', 'bottom']} style={styles.container}>
        <BadgerMart />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});