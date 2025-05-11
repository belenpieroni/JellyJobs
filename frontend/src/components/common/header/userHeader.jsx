import React from 'react';
import { Button, ConfigProvider, Space } from 'antd';
import { Link } from 'react-router-dom'; 

const UserHeader = () => (
    <ConfigProvider>
        <Space className='buttons-log'>
            <Link to="/aboutUs">  
                <Button className='header-button' type="primary" size="large">
                    ¿Quiénes somos?
                </Button>
            </Link>
            <Link to="/login">  
                <Button className='header-button' type="primary" size="large">
                    Login
                </Button>
            </Link>
        </Space>
    </ConfigProvider>
);

export default UserHeader;
