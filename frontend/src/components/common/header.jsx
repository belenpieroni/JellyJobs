import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../assets/styles/components/header.css';
import { useUser } from "../../context/UserContext";
import Logo from './header/logo.jsx';
import AdminHeader from './header/adminHeader.jsx';
import UserHeader from './header/userHeader.jsx';

const Header = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("access_token");
        setUser(null);
        navigate("/");
    };

    return (
        <header className='header'>
            <Logo user={user} />
            {user && user.role === "admin" ? (
                <AdminHeader user={user} handleLogout={handleLogout} />
            ) : (
                <UserHeader />
            )}
        </header>
    );
};

export default Header;
