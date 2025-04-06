import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, Dropdown, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, PoweroffOutlined, SettingOutlined } from '@ant-design/icons';

const AdminHeader = ({ user, handleLogout }) => {
    const menuItems = [
        {
            key: 'profile',
            label: <Link to="/perfil-user">Configuración de usuario</Link>,
            icon: <SettingOutlined />
        },
        {
            key: 'logout',
            label: "Cerrar sesión",
            icon: <PoweroffOutlined />,
            onClick: handleLogout,
        }
    ];

    return (
        <Space className='user-log'>
            <Typography.Text className='user-email'>
                {user.email}
            </Typography.Text>
            <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
                <Avatar icon={<UserOutlined />} className="user-avatar" />
            </Dropdown>
        </Space>
    );
};

AdminHeader.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired, 
    }).isRequired,
    handleLogout: PropTypes.func.isRequired 
};

export default AdminHeader;
