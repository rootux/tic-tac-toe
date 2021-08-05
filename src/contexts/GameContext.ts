import React from 'react';
import {Action, State} from "../reducers/game.reducer";

interface IContextProps {
  state: State;
  dispatch: (action:Action) => void;
}

export const GameContext = React.createContext({} as IContextProps);
