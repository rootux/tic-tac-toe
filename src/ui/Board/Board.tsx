import React from 'react'
import styled from 'styled-components'
import Square from './Square'

const BoardWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 60px 60px 60px;
  grid-template-rows: 60px 60px 60px;
`

const Board = () => {
  const squares = Array(9).fill(0, 0, 9)

  const renderSquares = () => {
    return squares.map((_, position) => {
      return (
        <Square
          key={position}
          position={position}
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
