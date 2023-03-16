import { BrowserRouter, Navigate, Route, Router,Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import Register from './pages/auth/Register';
import ChangePassword from './pages/auth/ChangePassword';
import AuthProtectedRoutes from './routesProtectionComponents/AuthProtectedRoutes';
import UnProtectedRoutes from './routesProtectionComponents/UnProtectedRoutes';
import Layout from './layout/Index';

function App() {
  return (

        <Routes>

        {/* Authentication Protected Routes */}
        <Route element ={<AuthProtectedRoutes/>}>
        <Route path="/main" element={<Layout/>}/>   
        <Route path="/user-list" element={<Layout/>}/>
 
          {/* Role Protected Routes
                <Route element={<RoleProtectedRoutes rolesRequired='ADMIN,GESTIONNAIRE'/>}>
                  <Route path='/testing' element={<Testing/>}/>
                </Route> */}
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
     



    // <div>
    //   <Router> 
    //     <Route path="/login" element={<Login/>}/>     
    //   </Router>
  
    // </div>
      

  );
}

export default App;
