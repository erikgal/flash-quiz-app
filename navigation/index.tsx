import React, { useEffect, useState } from 'react'
import { useAuthentication } from '../utils/hooks/useAuthentication'
import UserStack from './UserStack'
import AuthStack from './AuthStack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native'

const RootNavigation = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const { user } = useAuthentication()

  useEffect(() => {
    async function checkIfLoggedIn (): Promise<void> {
      const allKeys = await AsyncStorage.getAllKeys()
      const authKey = allKeys.filter(item => item.startsWith('firebase:authUser'))
      if (authKey.length === 0) {
        setLoading(false)
      }
    }
    void checkIfLoggedIn()
  }, [])

  useEffect(() => {
    if (user != null) {
      setLoading(false)
    }
  }, [user])

  return (user != null) ? <UserStack /> : loading ? <View/> : <AuthStack />
}

export default RootNavigation
