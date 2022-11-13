import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../screens/authStack/WelcomeScreen'
import SignInScreen from '../screens/authStack/SignInScreen'
import SignUpScreen from '../screens/authStack/SignUpScreen'

const Stack = createNativeStackNavigator()

const AuthStack = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WelcomeScreen" options={{ title: 'Welcome' }} component={WelcomeScreen} />
        <Stack.Screen name="SignUpScreen" options={{ title: 'Sign up' }} component={SignUpScreen} />
        <Stack.Screen name="SignInScreen" options={{ title: 'Sign in' }} component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStack
