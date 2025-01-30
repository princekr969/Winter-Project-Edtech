import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AboutSection, CourseCard, CoursePreview, CourseSection, LessonVideoPlayer, Login, SignUp} from './components/index.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store'
import "./index.css"
import {HomePage, CoursesPage, AboutPage} from "./Pages/index.js"
import Layout from './Layout/Layout.jsx'
import AuthLayout from './Layout/AuthLayout.jsx'

const router = createBrowserRouter(
createRoutesFromElements(
 
    <Route path="/" element={<Layout/>}>
      <Route path='' element={<HomePage/>}></Route>
      <Route path='courses' element={<CoursesPage/>}></Route>
      <Route path='about' element={<AboutPage/>}></Route>
      <Route path='course/'>
        <Route path='preview/:id' element={<CoursePreview/>}></Route>
        <Route path='video/:courseId/:moduleId/:lessonId' element={<LessonVideoPlayer/>}></Route>
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
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>,
  </StrictMode>,
)
