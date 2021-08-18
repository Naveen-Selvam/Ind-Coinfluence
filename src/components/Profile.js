import React,{useState, useEffect} from 'react';
import { Auth } from 'aws-amplify';
import { Alert } from 'antd';

const Profile = (props) => {
  const [alertMsgStatus, setAlertMsgStatus] = useState(false);

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
      console.log(error);
    }
  };

  return (
    <div>
      {
        alertMsgStatus &&
        <Alert
          banner
          message={props.location.state.detail}
          type='success'
          showIcon
        />
      }
      Welcome home
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
