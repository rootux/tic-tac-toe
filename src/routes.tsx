
import { lazy } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from "./ui/PrivateRoute/PrivateRoute";
import PublicRoute from "./ui/PublicRoute/PublicRoute";

const Signup = lazy(() => import('./pages/signup/Signup'));
const Home = lazy(() => import('./pages/home/Home'));
const Game = lazy(() => import('./pages/game/Game'));
const NotFound404 = lazy(() => import('./pages/404/404'));

export const Routes: React.FC = () => {
    return (
        <Switch>
            <PrivateRoute exact component={Game} path='/game'/>
            <PublicRoute restricted={true} component={Signup} path='/signup'/>
            <PublicRoute restricted={false} component={Home} path='/'/>
            <PublicRoute restricted={false} component={NotFound404} path="*"/>
        </Switch>
    )
}