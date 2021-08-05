
import { lazy } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from "./ui/PrivateRoute/PrivateRoute";
import PublicRoute from "./ui/PublicRoute/PublicRoute";

const Signup = lazy(() => import('./pages/signup/Signup'));
const Game = lazy(() => import('./pages/game/Game'));
const NotFound404 = lazy(() => import('./pages/404/404'));

export const Routes: React.FC = () => {
    return (
        <Switch>
            <PublicRoute restricted={true} component={Signup} path='/signup'/>
            <PrivateRoute component={Game} path='/'/>
            <PublicRoute restricted={false} component={NotFound404} path="*"/>
        </Switch>
    )
}
