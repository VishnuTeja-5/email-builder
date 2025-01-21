import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                console.log(userData);
                navigate('/dashboard')
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='p-4 flex-grow w-full h-full flex justify-center items-center'>
            <Form
                className='p-4  w-[450px] border rounded-md bg-blue-100 border-blue-600'
                layout='vertical'
                onFinish={create}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your name!',
                        },
                    ]}
                >
                    <Input placeholder='name' />
                </Form.Item>
                <Form.Item
                    label="email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please enter your username!',
                        },
                    ]}
                >
                    <Input placeholder='user@gmail.com' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder='password' />
                </Form.Item>
                
                <Form.Item label={null} style={{gap:'1rem'}}>
                    <Space wrap>
                    <Button type="primary" htmlType="submit">
                        Create Account
                    </Button>
                    <Button type="primary" htmlType="reset">
                        reset
                    </Button>
                    </Space>
                </Form.Item>
                {error && <div style={{ color: 'red' }}>{error}</div>}

            </Form>
        </div>
  )
}

export default SignUp