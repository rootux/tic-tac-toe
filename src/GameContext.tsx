import { createContext } from 'react';
import Game, { IGame } from './GameLogic/GameLogic';

export const GameContext = createContext<{ game: IGame }>({
  game: new Game()
});
GameContext.displayName = 'GameContext';
