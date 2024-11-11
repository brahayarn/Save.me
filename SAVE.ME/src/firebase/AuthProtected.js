import PropTypes from 'prop-types';
import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const AuthProtected = ({ children }) => {
    const { user } = useAuth();

    if (user === undefined) {
        return <div>Protected rout</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};
AuthProtected.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProtected;
