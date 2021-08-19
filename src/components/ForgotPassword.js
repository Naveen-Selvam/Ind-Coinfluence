import React,{ useState } from 'react';
import { Form, Input, Button, Alert, Row } from 'antd';
import { Auth } from 'aws-amplify';
import logo from '../images/logo.svg';
import 'antd/dist/antd.css';

const ForgotPassword = (props) => {
  const [verficationCode, setVerificationCode] = useState(false);
  const [error, setError] = useState('');

  const onFinish = (values) => {
    if(!verficationCode) {
      Auth.forgotPassword(values.email)
        .then(()=> setVerificationCode(!verficationCode))
        .catch((err)=>{console.log(err);});
    }
    else {
      Auth.forgotPasswordSubmit(
        values.email,
        values.verificationCode,
        values.newPassword
      )
        .then(()=> props.history.push({
          pathname: '/login',
          state: { detail: 'Updated Password Succesfully' }
        }))
        .catch((err)=>setError(err.message));
    }
  };

  return (

    <div className='form-background'>
      <div className='form-container'>
        <Row type="flex" justify="center" align="center">
          <div className='logo'>
            <img src={logo} alt='logo' className='logo__image'/>
            <h1 className='logo__title'>COINFLUENCE</h1>
          </div>
          <Form
            name='basic'
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <h2>Verify your email</h2>
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
            {
              verficationCode &&
                <div>
                  <Alert
                    banner
                    message={error ? error : 'Verification code sent to Email-id'}
                    type={error ? 'error' : 'success'}
                    showIcon
                  />
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
        </Row>
      </div>
    </div>
  );
};

export default ForgotPassword;
