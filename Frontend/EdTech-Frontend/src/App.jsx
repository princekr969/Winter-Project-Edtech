import { useEffect, useState } from 'react'
import {login, logout} from "./store/authSlice"
import { useDispatch } from 'react-redux'
import authService from "./services/auth.js"




function App() {

  // const [loading, setLoading] = useState(true)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   authService.getCurrentUser()
  //   .then((userData) => {
  //     if (userData) {
  //       dispatch(login({userData}))
  //     } else {
  //       dispatch(logout())
  //     }
  //   })
  //   .finally(() => setLoading(false))
  // }, [])

  return !loading? (
    <>
      <h1>HEllo</h1>
    </>
  ): null
}

export default App
