import {PlayerId} from "./GameLogic";
import alphaBetaMinMax from "./AlphaBetaMinMax";

it('Suggest a move', () => {
  const board: PlayerId[] = [
    '', '', '',
    '', '', '',
    '', '', ''] as PlayerId[]

  const suggestedMove = alphaBetaMinMax(board)
  expect(suggestedMove).toEqual(0);
})


it('Suggest the win move', () => {
  const board: PlayerId[] = [
    'O', 'O', 'X',
    '', 'X', '',
    '', '', ''] as PlayerId[]

  const suggestedMove = alphaBetaMinMax(board)
  expect(suggestedMove).toEqual(6);
})

it('Suggest the counter win move', () => {
  const board: PlayerId[] = [
    'O', 'X', 'O',
    'X', 'O', 'O',
    'X',  '', ''] as PlayerId[]

  const suggestedMove = alphaBetaMinMax(board)
  expect(suggestedMove).toEqual(8);
})

it('Suggest the best move', () => {
  const board: PlayerId[] = [
    'O', '', 'X',
    '', 'O', 'X',
    '', '', ''] as PlayerId[]

  const suggestedMove = alphaBetaMinMax(board)
  expect(suggestedMove).toEqual(8);
})
