import React, {Suspense} from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';

interface PublicRouteProps extends RouteProps {
    component: any
    restricted: boolean
    authorized: boolean
}

const PublicRoute = (props: PublicRouteProps) => {
    const { component: Component, restricted, authorized, ...rest } = props;

    return (
        <Route {...rest} render={props => (
          authorized && restricted ?
                <Redirect to="/" />
                :
                <Suspense fallback={<div>Loading...</div>}>
                    <Component {...props} />
                </Suspense>
        )} />
    );
};

export default PublicRoute;
