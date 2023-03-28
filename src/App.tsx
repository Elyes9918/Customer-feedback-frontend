import { Navigate, Route,Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import ChangePassword from './pages/auth/ChangePassword';
import AuthProtectedRoutes from './routesProtectionComponents/AuthProtectedRoutes';
import UnProtectedRoutes from './routesProtectionComponents/UnProtectedRoutes';
import Layout from './layout/Layout';
import RoleProtectedRoutes from './routesProtectionComponents/RoleProtectedRoutes';
import currentAccessToken from './utils/currentAccessToken';
import WizardRegistration from './pages/auth/WizardRegistration';
import { useAppDispatch } from './app/store';
import { RefreshTokenAction } from './features/authSlice';

function App() {

  const dispatch = useAppDispatch();

    if(localStorage.getItem("accessToken")){
      const token = currentAccessToken();
      if (token.exp * 1000  < Date.now()) {
        // localStorage.removeItem("accessToken");
        // localStorage.removeItem("currentUser");
        const user = {
          refresh_token:JSON.parse(localStorage.getItem('refresh_token') || '{}'),
        }
        dispatch(RefreshTokenAction(user)).then(()=>{
          window.location.reload();
        })
      }
    }

    
  return (


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
          <Route path="/register-client" element={<WizardRegistration/>}/>   
          <Route path="/register-member" element={<WizardRegistration/>}/>    
          <Route path="/resetPassword" element={<ResetPassword/>}/>    
          <Route path="/changePassword/:resetToken" element={<ChangePassword/>}/>   
          <Route path="/newPassword/:resetToken" element={<ChangePassword/>}/>   

          <Route path="/*" element={<Navigate to="/login" replace/>} />  
          
        </Route>



        </Routes>
     
      

  );
}

export default App;
