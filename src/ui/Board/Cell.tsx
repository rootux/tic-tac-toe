import React, {useContext, FC, useState} from 'react'
import styled from 'styled-components'
import { PlayerId } from '../../GameLogic/GameLogic'
import { GameContext } from '../../GameContext'
import X from './x.png'
import O from './circle.png'

const Wrapper = styled.button<{ state: PlayerId | undefined , shouldHover: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: #eb1478 3px solid;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${props => props.state === 'X' ? "url(" + X + ")" : props.state === 'O' ? "url(" + O + ")" : ''};
  background-color: ${props => props.shouldHover? "rgba(235,20,120,0.35)" : "default"};
  :hover {
    background-color: #eb1478;
  }
`

const Cell: FC<{ position: number, hoveredPosition:number | undefined, onHover:(position?: number) => void }> = (props) => {
  const gameContext = useContext(GameContext)
  const [state, setState] = useState<PlayerId | undefined>()

  const onClick = (position: number) => {
    gameContext.game!.fillCell(position)
    setState('X')
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
      state={state}
      onMouseEnter={() => { props.onHover(props.position)}}
      onMouseLeave={() => { props.onHover()}}
      onClick={() => onClick(props.position)}
    />
  )
}

export default Cell;
