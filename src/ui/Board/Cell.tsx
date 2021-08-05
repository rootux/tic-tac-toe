import React, {useContext, FC, useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { PlayerId } from '../../GameLogic/GameLogic'
import { GameContext } from '../../contexts/GameContext'
import X from './x.png'
import O from './circle.png'

const Wrapper = styled.button<{ state: PlayerId | undefined , shouldHover: boolean, loading: boolean}>`
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
    background-color: ${props => props.loading || props.state ? 'default' : "#eb1478"
  }
`

const Cell: FC<{ position: number, state: PlayerId | undefined, loading: boolean, hoveredPosition:number | undefined, onHover:(position?: number) => void }> =
  ({state, position, loading, hoveredPosition, ...props}) => {
  const dispatch:any = useContext(GameContext)

  const [activeSelf, setActiveSelf] = useState(false);

  const onClick = (position: number) => {
    if(!loading && !state) {
      dispatch({type: 'UPDATE_CELL', position, player: 'X'})
    }
  }

  const isInRow = useCallback(() => {
    if(hoveredPosition == null) return false
    return((position < 3 && hoveredPosition < 3) ||
      (position >= 3 && position < 6 && hoveredPosition >=3 && hoveredPosition < 6 ) ||
      (position >= 6 && position <= 9 && hoveredPosition >=6 && hoveredPosition <= 9 ))
  }, [position, hoveredPosition])

  const isInCol = useCallback(() => {
    if(hoveredPosition == null) return false
    const hovPosCol = hoveredPosition % 3
    const ourCol = position % 3
    return ourCol === hovPosCol
  },[position, hoveredPosition])

  const shouldHover = useCallback(() => {
    if(hoveredPosition === null) return false
    if(loading) return false
    if(isInRow()) {
      return true
    }
    return isInCol();
  }, [isInRow, isInCol, hoveredPosition, loading])

  useEffect(() => {
    setActiveSelf(shouldHover())
  },[hoveredPosition, shouldHover])

  const onHover = useCallback(()=> {
    if(state) return
    props.onHover(position)
  },[position, props, state])

  return (
    <Wrapper
      type="button"
      shouldHover={activeSelf}
      state={state}
      loading={loading}
      onMouseEnter={onHover}
      onMouseLeave={() => { props.onHover()}}
      onClick={() => onClick(position)}
    />
  )
}

export default Cell;
