import React,{useState, useEffect} from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import logo from '../images/logo.svg';
import 'antd/dist/antd.css';

const Login = (props) => {
  const [error, setError] = useState('');
  const [alertMsgStatus, setAlertMsgStatus] = useState(false);

  useEffect(()=>{
    if(props.location.state) {
      setAlertMsgStatus(true);
    }
    setTimeout(()=>{
      setError('');
      setAlertMsgStatus(false);
    },5000);
  },[error]);

  const onFinish = async function(values){
    try {
      const Result = await Auth.signIn({
        username: values.email,
        password: values.password,
      });
      if(Result) {
        props.history.push({
          pathname: '/proflie',
          state: { detail: 'Logged in Successfully' }
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='form-background'>
      <div className='form-container'>
        <div className='logo'>
          <img src={logo} alt='logo' className='logo__image'/>
          <h1 className='logo__title'>COINFLUENCE</h1>
        </div>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {
            alertMsgStatus &&
            <Alert
              banner
              message={props.location.state.detail}
              type='success'
              showIcon
            />
          }
          <h2>Sign In</h2>
          {
            error &&
            <Alert
              banner
              message={error}
              type='error'
              showIcon
            />
          }
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Enter your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Enter your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Link to='/forgotpassword'><h5>Forgot Password?</h5></Link>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
          <h5>Don't have an account? <Link to='/register'>Click here</Link></h5>
        </Form>
      </div>
    </div>
  );
};

export default Login;
