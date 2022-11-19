import React, { useEffect } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { View, Text } from 'react-native'
import SignOutButton from '../../../components/buttons/SignOutButton'
import wrapAsyncFunction from '../../../utils/functions/wrapAsyncFunction'
// import scrapeAllQuizzes from '../../../migrations/opentdb/scrapeAllQuizzes'

const ProfileScreen: React.FC = () => {
  const auth = getAuth()

  useEffect(() => {
  }, [])

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
        <SignOutButton text= {'Sign Out'} onPress={wrapAsyncFunction(async () => await signOut(auth))}/>
      </View>
  )
}

export default ProfileScreen
