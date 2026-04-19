import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import BadgerChat from './src/components/BadgerChat';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1}}>
        <BadgerChat />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}