import { BrowserRouter, Navigate, Route, Router,Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import Register from './pages/auth/Register';
import ChangePassword from './pages/auth/ChangePassword';
import AuthProtectedRoutes from './routesProtectionComponents/AuthProtectedRoutes';
import UnProtectedRoutes from './routesProtectionComponents/UnProtectedRoutes';
import Layout from './layout/Layout';
import RoleProtectedRoutes from './routesProtectionComponents/RoleProtectedRoutes';
import currentAccessToken from './utils/currentAccessToken';

function App() {

    if(localStorage.getItem("accessToken")){
      const token = currentAccessToken();
      if (token.exp * 1000 < Date.now()) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentUser");
      }
    }
    
    

  return (

      // Remove access Token and user if token is expired


        <Routes>

        {/* Authentication Protected Routes */}
        <Route element ={<AuthProtectedRoutes/>}>

          <Route path="/dashboard" element={<Layout/>}/>  
          
          <Route element={<RoleProtectedRoutes rolesRequired='ADMIN'/>}>
            <Route path="/user-list" element={<Layout/>}/>
            <Route path="/user-details/:userId" element={<Layout/>}/>
            <Route path="/*" element={<Navigate to="/dashboard" replace/>}/>
          </Route>

          <Route element={<RoleProtectedRoutes rolesRequired='ADMIN,CLIENT,GESTIONNAIRE,MEMBRE'/>}>

            <Route path="/user-profile" element={<Layout/>}/>
          </Route>



        </Route>


        {/* Unprotected Routes */}
        <Route element ={<UnProtectedRoutes/>}>

          <Route path="/login" element={<Login/>}/>  
          <Route path="/register" element={<Register/>}/>        
          <Route path="/resetPassword" element={<ResetPassword/>}/>    
          <Route path="/resetPassword/changePassword/:resetToken" element={<ChangePassword/>}/>   
          <Route path="/*" element={<Navigate to="/login" replace/>} />  
          
        </Route>



        </Routes>
     
      

  );
}

export default App;
