import React, {useState} from 'react'
import styled from 'styled-components'
import Cell from './Cell'

const BoardWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 60px 60px 60px;
  grid-template-rows: 60px 60px 60px;
`

const Board = () => {
  const squares = Array(9).fill(0, 0, 9)
  let [hoveredPosition, setHoveredPosition] = useState<number>();

  const onHover = (position:number) => {
    setHoveredPosition(position)
  }

  const renderSquares = () => {

    return squares.map((_, position) => {
      return (
        <Cell
          key={position}
          position={position}
          hoveredPosition={hoveredPosition}
          onHover={onHover}
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
