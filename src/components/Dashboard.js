import React,{useState, useEffect} from 'react';
import { Auth } from 'aws-amplify';
import { Alert } from 'antd';

const Dashboard = (props) => {
  const [alertMsgStatus, setAlertMsgStatus] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=>{
    if(props.location.state) {
      setAlertMsgStatus(true);
    }
    setTimeout(()=>{
      setAlertMsgStatus(false);
    },5000);
  },[]);

  const handleLogout = async () => {
    try {
      await Auth.signOut()
        .then(()=>{props.history.push('/login');});
    } catch (error){
      setError(error);
    }
  };

  return (
    <div>
      {error && <h1>{error}</h1>}
      {
        alertMsgStatus &&
        <Alert
          banner
          message={props.location.state.detail}
          type='success'
          showIcon
        />
      }
      <h1>Welcome to the coinfluence application</h1>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
