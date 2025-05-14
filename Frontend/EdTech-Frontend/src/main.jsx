import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { CreatedCourseList, Login, Profile, PurchasedCoursesList, SignUp, Dashboard, CartDropdown, ForgetPasswordForm} from './components/index.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store'
import "./index.css"
import {HomePage, CoursesPage, AboutPage, DashboardPage, CourseEditorPage, CourseVideoPlayerPage, CourseViewPage, CartPage} from "./Pages/index.js"
import AuthLayout from './Layout/AuthLayout.jsx'

const router = createBrowserRouter(
createRoutesFromElements(
  <Route>

    <Route path="/" element={<App/>}>
      <Route path='' element={<HomePage/>}></Route>
      <Route path='courses' element={<CoursesPage/>}></Route>
      <Route path='about' element={<AboutPage/>}></Route>
      <Route path='cart' element={<CartPage/>}></Route>
      <Route path='user/' element={<DashboardPage/>}>
        <Route path='dashboard' element={<Dashboard/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
        <Route path='purchased' element={<PurchasedCoursesList/>}></Route>
        <Route path='created' element={<CreatedCourseList/>}></Route>
      </Route>
      <Route path='course/'>
        <Route path='editor/:id' element={<CourseEditorPage/>}></Route>
        <Route path='preview/:id' element={<CourseViewPage/>}></Route>
        <Route path='video/:courseId/:moduleId/:lessonId' element={<CourseVideoPlayerPage/>}></Route>
      </Route>
      <Route path="auth/" element={<AuthLayout/>}>
        <Route path='signin' element={<Login/>}></Route>
        <Route path='signup' element={<SignUp/>}></Route>

      </Route>
    </Route>
      <Route path='forget-password/:token' element={<ForgetPasswordForm/>}></Route>
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
