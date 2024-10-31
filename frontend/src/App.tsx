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

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path='mypage' element={<Mypage />}>
            <Route path='profile' element={<Profile />} />
            <Route path='metrics' element={<Metrics />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

// const ErrorBoundary = () => {
//   let error = useRouteError();
//   console.error(error);
// Uncaught ReferenceError: path is not defined
//   return <div>Dang!</div>;
// }

export default App;
