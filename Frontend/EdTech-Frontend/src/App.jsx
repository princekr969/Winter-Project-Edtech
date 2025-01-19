import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { About, CourseCard, CourseSection, Login, SignUp} from './components/index.js'
import {Home} from "./Pages/index.js"
import Layout from './Layout/Layout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(

      <Route path="/" element={<Layout/>}>
        <Route path='' element={<Home/>}></Route>
        <Route path='courses' element={<CourseSection/>}></Route>
        <Route path='about' element={<About/>}></Route>
        <Route path="user/">
          <Route path='signin' element={<Login/>}></Route>
          <Route path='signup' element={<SignUp/>}></Route>
        </Route>
      </Route>
      
  
    
  )
)

function App() {
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
