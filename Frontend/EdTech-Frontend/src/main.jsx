import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { About, CourseCard, CoursePreview, CourseSection, LessonVideoPlayer, Login, SignUp} from './components/index.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store'
import "./index.css"
import {HomePage} from "./Pages/index.js"
import Layout from './Layout/Layout.jsx'
import AuthLayout from './Layout/AuthLayout.jsx'
import CoursePage from './Pages/CoursePage.jsx'
import { ModuleContextProvider } from './Context/ModuleContext.jsx'

const router = createBrowserRouter(
createRoutesFromElements(
 

    <Route path="/" element={<Layout/>}>
      <Route path='' element={<HomePage/>}></Route>
      <Route path='courses' element={<CoursePage/>}></Route>
      <Route path='about' element={<About/>}></Route>
      
        <Route>
          <Route path='course/:id' element={<CoursePreview/>}></Route>
          <Route path='/video' element={<LessonVideoPlayer/>}></Route>
        </Route>
      
      <Route path="user/" element={<AuthLayout/>}>
        <Route path='signin' element={<Login/>}></Route>
        <Route path='signup' element={<SignUp/>}></Route>
      </Route>
    </Route>
 
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ModuleContextProvider>

      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>,
     </ModuleContextProvider>
  
  </StrictMode>,
)
