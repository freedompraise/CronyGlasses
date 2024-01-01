
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
    const isLoggedIn = !!localStorage.getItem('userEmail'); 
    return (
        <Route {...rest} render={() => {
            return isLoggedIn ? children : <Redirect to="/login" />
        }} />
    )
    }

export default PrivateRoute;