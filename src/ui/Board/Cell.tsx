import React, {useContext, FC, useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { PlayerId } from '../../GameLogic/GameLogic'
import { GameContext } from '../../contexts/GameContext'
import X from './x.png'
import O from './circle.png'

const Wrapper = styled.button<{ state: PlayerId | undefined , shouldHover: boolean, isDisabled: boolean, isSuggested: boolean}>`
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
  background-color: ${props => props.isSuggested ? "#eb8314": 'default'};
  
  :hover {
    background-color: ${props => props.isDisabled ? 'default' : "#eb1478"
  }
  }
`

const Cell: FC<{ position: number, state: PlayerId | undefined, loading: boolean, hoveredPosition:number | undefined, onHover:(position?: number) => void }> =
  ({state, position, loading, hoveredPosition, ...props}) => {
  const {dispatch, state:gameState} = useContext(GameContext)
  const [isDisabled,setIsDisabled] = useState(false)
  const [activeSelf, setActiveSelf] = useState(false)
  const [isSuggested, setIsSuggested] = useState(false)

  useEffect(() => {
    if(gameState.winner || state || loading) {
    setIsDisabled(true)
    }else {
      setIsDisabled(false)
    }
  },
  [gameState.winner, state, loading])

    useEffect(() => {
      const isSuggested = (position === gameState.suggestedPosition)
      setIsSuggested(isSuggested)
    },[gameState.suggestedPosition])

  const onClick = (position: number) => {
    if(!loading && !state && !gameState.winner) {
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
    if(hoveredPosition === null || isDisabled) return false
    if(loading) return false
    if(isInRow()) {
      return true
    }
    return isInCol();
  }, [isInRow, isInCol, hoveredPosition, loading, isDisabled])

  useEffect(() => {
    setActiveSelf(shouldHover())
  },[hoveredPosition, shouldHover])

  const onHover = useCallback(()=> {
    if(isDisabled) return
    props.onHover(position)
  },[position, props, isDisabled])

  return (
    <Wrapper
      type="button"
      shouldHover={activeSelf}
      state={state}
      isDisabled={isDisabled}
      isSuggested={isSuggested}
      onMouseEnter={onHover}
      onMouseLeave={() => { props.onHover()}}
      onClick={() => onClick(position)}
    />
  )
}

export default Cell;
