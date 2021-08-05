import { isEmpty } from 'lodash-es'
import config from '../config/config'
import axios from 'axios'

function getToken() {
    const jwtToken = window.localStorage.getItem('jwtToken')
    return jwtToken
}

export function checkAuth() {
    const token = getToken()
    if(isEmpty(token)) {
      delete axios.defaults.headers.common["Authorization"];
      return false;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return !isEmpty(token)
}

export async function login(email:string) {
  const req = await axios.post(`${config.SERVER_URL}/auth`, {
    email,
  })
  const {token} = req.data //TODO: check for invalid email
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  window.localStorage.setItem('jwtToken', token)
  return req.data
}
