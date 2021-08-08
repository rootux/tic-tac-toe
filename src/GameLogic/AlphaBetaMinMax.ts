import GameLogic, {GameResult, PlayerId} from "./GameLogic";

/**
 * Minimax with Alpha-Beta pruning
 * Read about it here
 * https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/
 * @param board
 */
const alphaBetaMinMax = (board: PlayerId[]): number => {
  let result = {suggestedMove: 0 }
  getBestMove(board, 0, -Infinity, Infinity, 'X', result)
  return result.suggestedMove
}

const getBestMove = (board: PlayerId[], depth: number, alpha:number, beta:number, activePlayer: PlayerId, result: { suggestedMove: number }): number => {
  // Base rule
  const gameResult = GameLogic.getGameResult(board)
  if(gameResult !== GameResult.NoWinnerYet) {
    return getScore(gameResult, depth)
  }
  depth++
  const availableMoves = getAvailableMoves(board)
  if (activePlayer === 'O') {
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      const newBoard = [...board]
      newBoard[move] = 'O'

      const score = getBestMove(newBoard, depth, alpha, beta, 'X', result);
      if (score > alpha) {
        alpha = score;
        if (depth === 1) // Reached to top
          result.suggestedMove = move;
      } else if (alpha >= beta) {
        return alpha;
      }
    }
    return alpha;
  } else {
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      const newBoard = [...board]
      newBoard[move] = 'X'
      const score = getBestMove(newBoard, depth, alpha, beta, 'O', result);
      if (score < beta) {
        beta = score;
        if (depth === 1)
          result.suggestedMove = move
      } else if (beta <= alpha) {
        return beta;
      }
    }
    return beta;
  }
}

const getScore = (gameResult: GameResult, depth: number):number => {
  switch(gameResult) {
    case GameResult.Tie:
      return 0
    case GameResult.HumanWon:
      return depth - 10
    case GameResult.ComputerWon:
      return 10 - depth
  }
  return 0 //TODO: should not get here
}



const getAvailableMoves = (board: PlayerId[]) => {
  const moves:number[] = []
  board.forEach((cell, index) => {
    if(!cell) { moves.push(index)}
  })
  return moves
}

export default alphaBetaMinMax
