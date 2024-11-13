import React from 'react';
import {
  Routes,
  Route,
  // useRouteError,
} from 'react-router-dom';
import Login from './components/pages/home/Login';
import Signup from './components/pages/home/Signup';
import Mypage from './components/Mypage';
import AuthProvider from './components/auth/AuthProvider';
import PrivateRoute from './components/auth/PrivateRoute';
import Metrics from './components/pages/metrics/Metrics';
import Home from './components/pages/home/Home';
import Profile from './components/Profile';
import Goal from './components/pages/goal/Goal';
import Lessons from './components/Lessons';
import PremiumRoute from './components/auth/PremiumRoute';
import Community from './components/Community';
import MyRoutes from './components/MyRoutes';

function App() {
  return (
    <div className='text-black dark:text-white bg-white dark:bg-slate-800 text-center'>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='/' element={<PrivateRoute />}>
            <Route element={<Mypage />}>
              <Route path='profile' element={<Profile />} />
              <Route path='goal' element={<Goal />} />
              <Route path='metrics' element={<Metrics />} />
              <Route path='community' element={<Community />} />

              <Route path='premium' element={<PremiumRoute />}>
                <Route path='lessons' element={<Lessons />} />
                <Route path='my-routes' element={<MyRoutes />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

// const ErrorBoundary = () => {
//   let error = useRouteError();
//   console.error(error);
// Uncaught ReferenceError: path is not defined
//   return <div>Dang!</div>;
// }

export default App;
