import React,{useState, useEffect} from 'react';
import { Alert, Avatar } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';

const Welcome = (props) => {
  const [images, setImages] = useState([]);
  const [alertMsgStatus, setAlertMsgStatus] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(()=>{
    fetchImages();

    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((res)=> setUserInfo(res))
      .catch((err)=>console.log(err));

    if(props.location.state) {
      setAlertMsgStatus(true);
    }
    setTimeout(()=>{
      setAlertMsgStatus(false);
    },5000);
  },[]);

  async function fetchImages() {
    let imageKeys = await Storage.list('');
    imageKeys = await Promise.all(imageKeys?.map(async ele =>{
      const signedUrl = await Storage.get(ele.key);
      return signedUrl;
    }));
    setImages(imageKeys);
  }

  const greetingVisitor = () => {
    const myDate = new Date();
    const hrs = myDate.getHours();
    let greet;

    if (hrs < 12) {
      greet = 'Good Morning';
    }
    else if (hrs >= 12 && hrs <= 17) {
      greet = 'Good Afternoon';
    }
    else if (hrs >= 17 && hrs <= 24) {
      greet = 'Good Evening';
    }
    else null;
    return greet;
  };

  return (
    <div className='form-container'>
      <div className='welcome__container'>
        <div className='welcome__header'>
          <MenuOutlined />
          <h4>COINFLUENCE</h4>
          <Avatar src={userInfo.attributes?.picture} size={30}/>
        </div>
        {
          alertMsgStatus &&
          <Alert
            banner
            message={props.location.state.detail}
            type='success'
            showIcon
          />
        }
        <div className='welcome__container__greeting'>{greetingVisitor()}</div>
        <div className='welcome__container__content'>Hello {userInfo.username?.split('_').join(' ')},</div>
        <div className='welcome__container__content'>staying home or travelling</div>
        <div className='welcome__container__box'>
          {
            images.map((image)=>{
              return <img className='welcome__container__image' src={image} key={image}/>;
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Welcome;
