import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { login as authlogin } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authlogin(userData));
                navigate("/dashboard")
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
                onFinish={login}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please enter your email!',
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
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <Form.Item label={null} style={{gap:'1rem'}}>
                    <Space wrap>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button type="primary" htmlType="reset">
                        reset
                    </Button>
                    </Space>
                </Form.Item>

            </Form>
        </div>
    )
}

export default Login