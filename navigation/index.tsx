import React from 'react'
import { useAuthentication } from '../utils/hooks/useAuthentication'
import UserStack from './UserStack'
import AuthStack from './AuthStack'

const RootNavigation = (): JSX.Element => {
  const { user } = useAuthentication()

  return (user != null) ? <UserStack /> : <AuthStack />
}

export default RootNavigation
