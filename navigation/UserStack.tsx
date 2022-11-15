import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@expo/vector-icons/Ionicons'
import HomeScreen from '../screens/userStack/home/HomeScreen'
import PreviewScreen from '../screens/userStack/home/PreviewScreen'
import QuizScreen from '../screens/userStack/home/QuizScreen'
import SummaryScreen from '../screens/userStack/home/SummaryScreen'
import ProfileScreen from '../screens/userStack/profile/ProfileScreen'
import StoreScreen from '../screens/userStack/store/StoreScreen'

const HomeStack = createNativeStackNavigator()
const HomeStackScreen: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" options={{ title: 'Home' }} component={HomeScreen} />
      <HomeStack.Screen name="PreviewScreen" options={{ title: 'Preview' }} component={PreviewScreen}/>
      <HomeStack.Screen name="QuizScreen" options={{ title: 'Quiz' }} component={QuizScreen}/>
      <HomeStack.Screen name="SummaryScreen" options={{ title: 'Summary', headerBackVisible: false }} component={SummaryScreen}/>
    </HomeStack.Navigator>
  )
}

const StoreStack = createNativeStackNavigator()
const StoreStackScreen: React.FC = () => {
  return (
    <StoreStack.Navigator>
      <StoreStack.Screen name="StoreScreen" options={{ title: 'Store' }} component={StoreScreen} />
    </StoreStack.Navigator>
  )
}

const ProfileStack = createNativeStackNavigator()
const ProfileStackScreen: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" options={{ title: 'Profile' }} component={ProfileScreen} />
    </ProfileStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const UserStack: React.FC = () => {
  return (
    <NavigationContainer >
      <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'Store') {
            iconName = 'cloud-download'
          } else if (route.name === 'Profile') {
            iconName = 'person'
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        headerShown: false
      })}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Store" component={StoreStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default UserStack
