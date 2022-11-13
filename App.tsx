import React from 'react'
// import Navigation from './navigation/UserStack'
import RootNavigation from './navigation'
import store from './store'
import { Provider } from 'react-redux'

const App: React.FC = () => {
  return (
    <Provider store={store}>
    {/* <Navigation/> */}
    <RootNavigation/>
    </Provider>
  )
}

export default App
