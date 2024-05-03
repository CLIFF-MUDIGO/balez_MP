import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import Divider from '../../components/Divider'
import { LoginUser } from '../../apicalls/users'


const rules = [
  {
    required: true,
    message: 'required'
  }
]


const Login = () => {


  const onFinish = async(values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };


  return (
    <div className='h-screen bg-primary flex justify-center items-center'>
      <div className='bg-white p-5 rounded w-[450px]'>
        <h1 className='text-primary text-2xl'>
          CMP - <span className='text-gray-400'>Login</span>
        </h1>
        <Divider />
        <Form layout='vertical'
          onFinish={onFinish}
        >

          <Form.Item label="Email" name="email"
            rules={rules}
          >
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item label="Password" name="password"
            rules={rules}
          >
            <Input type="password" placeholder='Password' />
          </Form.Item>

          <Button type='primary' htmlType='submit' block className='mt-2'>Login</Button>
          <div className='mt-3 text-center'>
            <span className='text-gray-500' >
              Don't have an account? {" "} <Link to="/register" className='text-primary'>Register</Link>
            </span>
          </div>
        </Form>

      </div>
    </div>
  )
}

export default Login