import React, { useContext, FC } from 'react';
import styled from 'styled-components';

import { PlayerId } from '../../GameLogic/GameLogic';
import { GameContext } from '../../GameContext';

const Wrapper = styled.button<{ state: PlayerId | undefined }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: #eb1478 3px solid;
  cursor: pointer;
  
  :hover {
    background-color: #eb1478;
  }
`;

const Square: FC<{ position: number, state?: PlayerId | undefined }> = (props) => {
  const gameContext = useContext(GameContext);

  const onClick = (position: number) => {
    gameContext.game!.fillSquare(position);
  };

  return (
    <Wrapper
      type="button"
      state={props.state}
      onClick={() => onClick(props.position)}
    />
  );
};

export default Square;
