import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@expo/vector-icons/Ionicons'
import HomeScreen from '../screens/userStack/home/HomeScreen'
import HomePreviewScreen from '../screens/userStack/home/HomePreviewScreen'
import QuizFormScreen from '../screens/userStack/home/quiz-form/QuizFormScreen'
import SummaryFormScreen from '../screens/userStack/home/quiz-form/SummaryFormScreen'
import ProfileScreen from '../screens/userStack/profile/ProfileScreen'
import StoreScreen from '../screens/userStack/store/StoreScreen'
import StorePreviewScreen from '../screens/userStack/store/StorePreviewScreen'
import UploadScreen from '../screens/userStack/store/UploadScreen'
import CreateQuizScreen from '../screens/userStack/home/CreateQuizScreen'
import AddQuestionToQuizScreen from '../screens/userStack/home/AddInformationToQuizScreen'
import QuizMultipleScreen from '../screens/userStack/home/quiz-multiple-choice/QuizMultipleScreen'
import SummaryMultipleScreen from '../screens/userStack/home/quiz-multiple-choice/SummaryMultipleScreen'

const HomeStack = createNativeStackNavigator()
const HomeStackScreen: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" options={{ title: 'Home' }} component={HomeScreen} />
      <HomeStack.Screen name="HomePreviewScreen" options={{ title: 'Preview' }} component={HomePreviewScreen}/>
      <HomeStack.Screen name="QuizFormScreen" options={{ title: 'Quiz' }} component={QuizFormScreen}/>
      <HomeStack.Screen name="SummaryFormScreen" options={{ title: 'Summary', headerBackVisible: false }} component={SummaryFormScreen}/>
      <HomeStack.Screen
        name="CreateQuizScreen"
        options={{ title: 'Create Quiz', headerBackVisible: true }}
        component={CreateQuizScreen}
      />
      <HomeStack.Screen
        name="AddQuestionToQuizScreen"
        options={{ title: 'Add Questions', headerBackVisible: true }}
        component={AddQuestionToQuizScreen}
      />
      <HomeStack.Screen name="QuizMultipleScreen" options={{ title: 'Quiz' }} component={QuizMultipleScreen}/>
      <HomeStack.Screen name="SummaryMultipleScreen" options={{ title: 'Summary', headerBackVisible: false }} component={SummaryMultipleScreen}/>
    </HomeStack.Navigator>
  )
}

const StoreStack = createNativeStackNavigator()
const StoreStackScreen: React.FC = () => {
  return (
    <StoreStack.Navigator>
      <StoreStack.Screen name="StoreScreen" options={{ title: 'Store' }} component={StoreScreen} />
      <StoreStack.Screen name="StorePreviewScreen" options={{ title: 'Preview' }} component={StorePreviewScreen} />
      <StoreStack.Screen name="UploadScreen" options={{ title: 'Pick a quiz to upload' }} component={UploadScreen} />
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
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
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
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Store" component={StoreStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default UserStack
