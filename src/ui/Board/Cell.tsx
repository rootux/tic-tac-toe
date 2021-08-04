import React, { useContext, FC } from 'react'
import styled from 'styled-components'
import { PlayerId } from '../../GameLogic/GameLogic'
import { GameContext } from '../../GameContext'

const Wrapper = styled.button<{ state: PlayerId | undefined , shouldHover: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: #eb1478 3px solid;
  cursor: pointer;
  background-color: ${props => props.shouldHover? "rgba(235,20,120,0.35)" : "default"};
  :hover {
    background-color: #eb1478;
  }
`

const Cell: FC<{ position: number, state?: PlayerId | undefined, hoveredPosition:number | undefined, onHover:(position?: number) => void }> = (props) => {
  const gameContext = useContext(GameContext)

  const onClick = (position: number) => {
    gameContext.game!.fillCell(position)
  }

  const shouldHover = () => {
    if(props.hoveredPosition === null) return false
    if(isInRow()) {
      return true
    }
    return isInCol();
  }

  const isInRow = () => {
    const { hoveredPosition, position } = props
    if(hoveredPosition == null) return false
    return((position < 3 && hoveredPosition < 3) ||
      (position >= 3 && position < 6 && hoveredPosition >=3 && hoveredPosition < 6 ) ||
      (position >= 6 && position <= 9 && hoveredPosition >=6 && hoveredPosition <= 9 ))
  }

  const isInCol = () => {
    const { hoveredPosition, position } = props
    if(hoveredPosition == null) return false
    const hovPosCol = hoveredPosition % 3
    const ourCol = position % 3
    return ourCol === hovPosCol
  }

  return (
    <Wrapper
      type="button"
      shouldHover={shouldHover()}
      state={props.state}
      onMouseEnter={() => { props.onHover(props.position)}}
      onMouseLeave={() => { props.onHover()}}
      onClick={() => onClick(props.position)}
    />
  )
}

export default Cell;
