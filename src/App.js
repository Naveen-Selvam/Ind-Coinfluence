import React,{ useState, useEffect} from 'react';
import { Auth } from 'aws-amplify';
import { Route, Redirect } from 'react-router-dom';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false)

  useEffect(async () => {
    try {
      const session = await Auth.currentSession();
      if(session){
        setisAuthenticated(true);
      }
    } catch(error) {
      console.log(error);
    }
  },[])

  return (
    <div className='main'>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path='/forgotpassword' exact component={ForgotPassword} />

      {
        isAuthenticated 
        ? <Route path="/profile" exact component={Profile} />
        : <Redirect to='/login'/>
      }
      
    </div>
  )
}

export default App
