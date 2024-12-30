import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { Home } from "../views/Home"
import { Login } from "../views/Login";
import { Dashboard } from "../views/Dashboard";
import ProtectedRoutes from './ProtectedRoutes'
import { useEffect } from "react";
import {auth} from '../firebase/credentials'
import { useDispatch, useSelector} from "react-redux";
import { userLogin } from "../redux/userSlice";
import { userType } from "../types/types";
import { RedirectLink } from "../views/RedirectLink";


export const AppRoutes = () => {

  const dispatch = useDispatch();

  const isAuth = useSelector((state:userType)=>state.user.isAuth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const data = {
          name: user.displayName,
          uid: user.uid,
          img: user.photoURL,
          email: user.email
        };
        dispatch(userLogin(data)); 
      }
      
    });
    return () => unsubscribe();
  }, [dispatch]);
  
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          
          <Route path="/login" element={isAuth?<Navigate to='/'/>:<Login/>}/>
          
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/:shortUrl" element={<RedirectLink/>}/>
            
        </Routes>
    </Router>
  )
}
