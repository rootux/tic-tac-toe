import ServerError from "../../errors/ServerError";
import _ from "lodash";
import axios from "axios";
import config from "../../config/config";
import {useState} from "react";
import {PlayerId} from "../../GameLogic/GameLogic";

interface ServerResponse {
  board: string[][]
  success: boolean
}

const useGameEngine = () => {
  const [loading, setLoading] = useState(false)

  async function sendBoard(board: PlayerId[]): Promise<PlayerId[]> {
    setLoading(true)
    const response = await sendBoardToServer(board)
    setLoading(false)
    const responseData = response.data as ServerResponse
    return flattenBoard(responseData)
  }

  function sendBoardToServer(board: PlayerId[]) {
    return axios.post(`${config.SERVER_URL}/engine`, {
      board: getFormattedBoard(board)
    })
  }

  function flattenBoard(response: ServerResponse) {
    if(!response.success) {
      throw new ServerError("Got invalid response", response)
    }
    return _.flatten(response.board) as PlayerId[]
  }

  function getFormattedBoard(board:PlayerId[]): string[][] {
    return _.chunk(board, 3)
  }

  return [loading, sendBoard] as const
}

export default useGameEngine
