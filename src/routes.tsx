
import {lazy, useEffect, useState} from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from "./ui/PrivateRoute/PrivateRoute";
import PublicRoute from "./ui/PublicRoute/PublicRoute";
import {checkAuth} from "./shared/auth";

const Signup = lazy(() => import('./pages/signup/Signup'));
const Game = lazy(() => import('./pages/game/Game'));
const NotFound404 = lazy(() => import('./pages/404/404'));


export const Routes: React.FC = () => {
  const [authorized, setAutorized] = useState(false)
  useEffect(() => {
    setAutorized(checkAuth())
  },[])

  return (
        <Switch>
            <PublicRoute authorized={authorized} restricted={true} component={Signup} path='/signup'/>
            <PrivateRoute component={Game} path='/'/>
            <PublicRoute authorized={authorized} restricted={false} component={NotFound404} path="*"/>
        </Switch>
    )
}
