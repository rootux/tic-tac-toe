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

it('Suggest the best move - predict 2 moves ahead', () => {
  const board: PlayerId[] = [
    'X', '', '',
    'O', 'X', '',
    '', '', 'O'] as PlayerId[]

  const suggestedMove = alphaBetaMinMax(board)
  expect(suggestedMove).toEqual(1);
})

it('Suggest the best move - predict 2 moves ahead again', () => {
  const board: PlayerId[] = [
    '', '', 'O',
    '', 'X', '',
    'X', 'O', ''] as PlayerId[]

  const suggestedMove = alphaBetaMinMax(board)
  expect(suggestedMove).toEqual(3);
})

it('Suggest a win move', () => {
  const board: PlayerId[] = [
    'X', 'O', 'X',
    '', 'X', 'O',
    '', '', 'O'] as PlayerId[]

  const suggestedMove = alphaBetaMinMax(board)
  expect(suggestedMove).toEqual(6);
})
