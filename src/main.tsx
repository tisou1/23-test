import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { ClickToComponent } from 'click-to-react-component'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from '~react-pages'
import './index.css'
import 'uno.css'
import Footer from './components/footer'
import store from './store'
import '@code-hike/mdx/dist/index.css'

// theme
import 'primereact/resources/themes/lara-light-indigo/theme.css'

// core
import 'primereact/resources/primereact.min.css'

// import 'virtual:stylex.css'

console.log(routes, '>>')

const root = ReactDOM.createRoot(document.querySelector('#root')!)
function App() {
  return (
    <Suspense>
      {useRoutes(routes)}
    </Suspense>
  )
}

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
      <ClickToComponent />
    </Router>
    <Footer />
  </Provider>,
  // </React.StrictMode>,
)
