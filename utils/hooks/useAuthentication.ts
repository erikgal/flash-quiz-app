import React from 'react'
import { initializeAuth, onAuthStateChanged, User } from 'firebase/auth'
import app from '../../firebaseConfig'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Provide it to initializeAuth.
const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
// const auth = getAuth(app)

interface UseAuthenticationProps {
  user: User | undefined
}

export function useAuthentication (): UseAuthenticationProps {
  const [user, setUser] = React.useState<User>()

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user)
      } else {
        // User is signed out
        setUser(undefined)
      }
    })

    return unsubscribeFromAuthStatuChanged
  }, [])

  return {
    user
  }
}
