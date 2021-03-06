import React,{useState, useEffect} from 'react';
import { Form, Input, Button, Alert, Row } from 'antd';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { CardProfile } from './profilePic';
import 'antd/dist/antd.css';

const Register = (props) => {
  const [file, setFile] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{
    setTimeout(()=>{
      setError('');
    },5000);
  },[error]);

  const onFinish = async function(values) {
    try {
      const Result = await Auth.signUp({
        username: values.username.split(' ').join('_'),
        password: values.password,
        attributes: {
          email: values.email,
          address: values.city,
          picture: file,
          'custom:instagram': values.instagram,
          'custom:tiktok': values.tiktok,
          'custom:youtube': values.youtube,
        }
      });
      if(Result) {
        props.history.push({
          pathname: '/login',
          state: { detail: 'Verify you email before logging in' }
        });
      }
    } catch (error) {
      window.scrollTo(0,0);
      setError(error.message);
    }
  };

  const uploadFile = (data) => {
    setFile(data);
  };

  return (
    <div className='form-container'>
      <Row type="flex" justify="center" align="center">
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
          <div className='form-container-avatar'>
            <h2>Sign Up</h2>
            <CardProfile uploadFile={uploadFile}/>
          </div>
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
            rules={[
              {
                type: 'email',
                message: 'Invalid Email address!',
              },
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
              {
                min: 8,
                message: 'Password must be minimum 8 characters.'
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Name"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter your name!',
              },
              {
                min: 5, message: 'Username must be minimum 5 characters.'
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: 'Please enter your city',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Instagram"
            name="instagram"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tik Tok"
            name="tiktok"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Youtube"
            name="youtube"
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Sign Up
            </Button>
          </Form.Item>

          <h5>Already have an account? <Link to='/login'>Click here</Link></h5>
        </Form>
      </Row>
    </div>
  );
};

export default Register;
