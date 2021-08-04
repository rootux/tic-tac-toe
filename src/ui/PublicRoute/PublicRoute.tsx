import React, { Suspense } from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {checkAuth} from "../../shared/auth";

interface PublicRouteProps extends RouteProps {
    component: any;
    restricted: boolean;
}

const PublicRoute = (props: PublicRouteProps) => {
    const { component: Component, restricted, ...rest } = props;
    return (
        <Route {...rest} render={props => (
            checkAuth() && restricted ?
                <Redirect to="/" />
                :
                <Suspense fallback={<div>Loading...</div>}>
                    <Component {...props} />
                </Suspense>
        )} />
    );
};

export default PublicRoute;