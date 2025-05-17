import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../../services/auth';
import { useDispatch } from 'react-redux';
import {login} from '../../store/authSlice'
import Loader from '../../utils/Loader.jsx'

function AuthSuccess() {
    const navigate = useNavigate();
    const {token} = useParams();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
        try {
            if (token) {
                if(token==="a7X9vB2qLmTZ0kPf"){
                    console.log("oauthinvalid")
                    navigate("/auth/signin?error=oautha7X9vB2qLmTZ0kPf");
                    return;
                }
               const userData = await authService.getCurrentUser(token); 
                console.log("Oauth", userData);
                if(userData){
                    dispatch(login(userData.message.user))
                    navigate("/");
                }
            }
        } catch (error) {
            console.log("Error in fetch Oauth user data", error);
        } finally{
            setLoading(false);
        }
    }
    fetchData();
    
  }, []);
  return (loading) ?(
    <Loader/>
  ):null
}

export default AuthSuccess
