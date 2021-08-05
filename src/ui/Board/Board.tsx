import React, {useState} from 'react'
import styled from 'styled-components'
import Cell from './Cell'
import {PlayerId} from "../../GameLogic/GameLogic";

const BoardWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 60px 60px 60px;
  grid-template-rows: 60px 60px 60px;
`

const Board = ({boardState, loading}:{boardState: PlayerId[], loading: boolean}) => {
  let [hoveredPosition, setHoveredPosition] = useState<number | undefined>();

  const onHover = (position:number | undefined) => {
    setHoveredPosition(position)
  }

  const renderSquares = () => {

    return boardState.map((sq, position) => {
      return (
        <Cell
          key={position}
          position={position}
          hoveredPosition={hoveredPosition}
          onHover={onHover}
          loading={loading}
          state={sq}
        />
      );
    });
  }

  return (
    <BoardWrapper>
      {renderSquares()}
    </BoardWrapper>
  )
}

export default Board;
