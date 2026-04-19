import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import BadgerConversionScreen from './screens/BadgerConversionScreen';
import { Alert } from 'react-native';


const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    // hmm... maybe I should load the chatroom names here
    // setChatrooms(["Hello", "World"]) // for example purposes only!

    fetch('https://cs571api.cs.wisc.edu/rest/s26/hw9/chatrooms', {
      headers: { 'X-CS571-ID': CS571.getBadgerId() }
    })
      .then(res => res.json())
      .then(data => setChatrooms(data));
      }, []);

  async function handleLogin(username, pin) {
    // hmm... maybe this is helpful!
    // setIsLoggedIn(true); // I should really do a fetch to login first!
    const res = await fetch('https://cs571api.cs.wisc.edu/rest/s26/hw9/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'X-CS571-ID': CS571.getBadgerId() 
      },
      body: JSON.stringify({ username, pin })
    });

    if (res.status === 200) {
      const data = await res.json();
      await SecureStore.setItemAsync('jwt', data.token);
      setIsLoggedIn(true);
    } else {
      Alert.alert("Login failed. Please check your username and pin and try again.");
    }
  }

  async function handleSignup(username, pin) {
    // hmm... maybe this is helpful!
    // setIsLoggedIn(true); // I should really do a fetch to register first!
    const res = await fetch('https://cs571api.cs.wisc.edu/rest/s26/hw9/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CS571-ID': CS571.getBadgerId()
      },
      body: JSON.stringify({ username, pin })
    });

    if (res.status === 200) {
      const data = await res.json();
      await SecureStore.setItemAsync('jwt', data.token);
      setIsLoggedIn(true);
    } else if (res.status === 409) {
      Alert.alert("Signup failed", "The username is already taken.");
    } else {
      Alert.alert("Signup failed", "Please try again later.");
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  function handleConversion() {
    setIsGuest(false);
    setIsRegistering(true);
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} />}
              </ChatDrawer.Screen>
            })
          }
          <ChatDrawer.Screen name='Logout'>
            {(props) => <BadgerLogoutScreen handleLogout={handleLogout} />}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isGuest) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} isGuest={true} />}
              </ChatDrawer.Screen>
            })
          }
          <ChatDrawer.Screen name='Signup'>
            {(props) => <BadgerConversionScreen handleConversion={handleConversion} />}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} setIsGuest={setIsGuest} />
  }
}