import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import slideApp from '../redux/reducers'
import App from '../component/App'
import { nextSlide, prevSlide } from '../redux/actions'

let store = createStore(slideApp)

console.log(store.getState())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('body-slide')
)

// Debugging

// import { createStore } from 'redux'
// import slideApp from '../redux/reducers'
// import { nextSlide, prevSlide } from '../redux/actions'

// let store = createStore(slideApp)

// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )

// store.dispatch(nextSlide())

// unsubscribe()