import React, { Suspense } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { checkAuth } from "../../shared/auth";

interface PrivateRouteProps extends RouteProps {
    component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    return (
        <Route
            {...rest}
            render={props => (
            checkAuth() ?
                <Suspense fallback={<div>Loading...</div>}>
                    <Component {...props} />
                </Suspense>
                : <Redirect to="/signup" />
        )} />
    );
};

export default PrivateRoute;