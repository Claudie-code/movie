import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ component: Component, seriesGenres, ...rest }) {
    const { currentUser } = useAuth();

    return (
        <Route 
            {...rest} 
            render={props => {
                return currentUser ? <Component {...props} seriesGenres={seriesGenres} /> : <Redirect to="/login" />
            }}
        ></Route>
    )
};

