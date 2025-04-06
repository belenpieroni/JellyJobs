import React from 'react';
import { Button, ConfigProvider, Space } from 'antd';

const UserHeader = () => (
    <ConfigProvider>
        <Space className='buttons-log'>
            <Button className='header-button' href="/aboutUs" type="primary" size="large">
                ¿Quiénes somos?
            </Button>
            <Button className='header-button' href="/login" type="primary" size="large">
                Login
            </Button>
        </Space>
    </ConfigProvider>
);

export default UserHeader;
