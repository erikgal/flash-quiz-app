import React from 'react'
import RootNavigation from './navigation'
import store from './store'
import { Provider } from 'react-redux'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  )
}

export default App
