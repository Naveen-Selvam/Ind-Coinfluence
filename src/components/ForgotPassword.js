import React,{useState} from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { Auth } from 'aws-amplify';
import logo from '../images/logo.svg';
import 'antd/dist/antd.css';

const ForgotPassword = (props) => {
  const [verficationCode, setVerificationCode] = useState(false)

  const onFinish = (values) => {
  
    if(!verficationCode) {
      Auth.forgotPassword(values.email)
      .then((res)=> setVerificationCode(!verficationCode))
      .catch((err)=>{console.log(err)});
    }
    else {
      Auth.forgotPasswordSubmit(
        values.email,
        values.verificationCode,
        values.newPassword
      )
      .then((res)=> props.history.push({
        pathname: '/login',
        state: { detail: 'Logged in Succesfully' }
      }))
      .catch((err)=>{console.log(err)});
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
          onFinishFailed={onFinishFailed}
        >
          <h2>Verify your email</h2>
          {
            !verficationCode &&
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            }
            {
              verficationCode && 
              <div>
                <Alert banner message="Verification sent to Email-id" type="success" showIcon />
                <Form.Item
                  label="Verification Code"
                  name="verificationCode"
                  rules={[
                    {
                      required: true,
                      message: 'Enter the verification code',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    {
                      required: true,
                      message: 'Enter your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Enter your password!'
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('Password does not match!');
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>
            }

          <Form.Item>
            <Button type="primary" htmlType="submit">
              submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
