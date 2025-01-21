import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { About, CourseCard, CourseSection, Login, SignUp} from './components/index.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store'
import "./index.css"
import {Home} from "./Pages/index.js"
import Layout from './Layout/Layout.jsx'
import AuthLayout from './Layout/AuthLayout.jsx'

const router = createBrowserRouter(
createRoutesFromElements(

    <Route path="/" element={<Layout/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='courses' element={<CourseSection/>}></Route>
      <Route path='about' element={<About/>}></Route>
      <Route path="user/" element={<AuthLayout/>}>
        <Route path='signin' element={<Login/>}></Route>
        <Route path='signup' element={<SignUp/>}></Route>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>,
  
  </StrictMode>,
)
