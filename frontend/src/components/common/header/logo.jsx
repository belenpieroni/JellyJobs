import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo.png';

const Logo = ({ user }) => (
    <a href={user ? "/home" : "/"} className='links logo-JellyJobs'>
        <img src={logo} alt="logo" />
    </a>
);

Logo.propTypes = {
    user: PropTypes.shape({})
};

export default Logo;
