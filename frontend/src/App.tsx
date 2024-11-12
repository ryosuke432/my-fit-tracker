import React from 'react';
import {
  Routes,
  Route,
  // useRouteError,
} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Mypage from './components/Mypage';
import AuthProvider from './components/auth/AuthProvider';
import PrivateRoute from './components/auth/PrivateRoute';
import Metrics from './components/Metrics';
import Home from './components/Home';
import Profile from './components/Profile';
import Goal from './components/Goal';
import Lessons from './components/Lessons';
import PremiumRoute from './components/auth/PremiumRoute';

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

              <Route path='premium' element={<PremiumRoute />}>
                <Route path='lessons' element={<Lessons />} />
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
