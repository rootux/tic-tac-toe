import GameLogic, {PlayerId} from "./GameLogic";

it('recognizes when someone win in col', () => {
  const board: PlayerId[] = [
    'O', 'O', 'O',
    '', '', '',
    '', '', ''] as PlayerId[]

  const isWinner = GameLogic.checkWinner(board, 'O')
  expect(isWinner).toEqual(true);
})

it('recognizes when someone win in row', () => {
  const board: PlayerId[] = [
    'O', '', '',
    'O', '', '',
    'O', '', ''] as PlayerId[]

  const isWinner = GameLogic.checkWinner(board, 'O')
  expect(isWinner).toEqual(true);
})


it('recognizes when someone win in diagonal right', () => {
  const board: PlayerId[] = [
    'O', '', '',
    '', 'O', '',
    '', '', 'O'] as PlayerId[]

  const isWinner = GameLogic.checkWinner(board, 'O')
  expect(isWinner).toEqual(true);
})

it('recognizes when someone win in diagonal left', () => {
  const board: PlayerId[] = [
    '', '', 'O',
    '', 'O', '',
    'O', '', ''] as PlayerId[]

  const isWinner = GameLogic.checkWinner(board, 'O')
  expect(isWinner).toEqual(true);
})

it('recognizes when no one wins', () => {
  const board: PlayerId[] = [
    'O', 'X', 'X',
    'X', 'X', 'O',
    'O', 'O', 'X'] as PlayerId[]

  const isWinner = GameLogic.checkWinner(board, 'O')
  expect(isWinner).toEqual(false);
})

