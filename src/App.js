import React,{ useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(Object.keys(localStorage).length);

  const authenticationStatus = () => {
    setisAuthenticated(true);
  };

  return (
    <div className='main'>
      <Route
        path="/login"
        exact
        render={(props) => <Login {...props} authenticationStatus={authenticationStatus} />}
      />
      <Route path="/register" exact component={Register} />
      <Route path='/forgotpassword' exact component={ForgotPassword} />

      {
        !isAuthenticated
          ? <Redirect to='/login'/>
          : <Route path="/dashboard" exact component={Dashboard} />
      }

    </div>
  );
};

export default App;
