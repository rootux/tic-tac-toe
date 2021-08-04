import { isEmpty } from 'lodash-es'

function getAuthUser() {
    const jwt = window.localStorage.getItem('jwtToken')
    if (!jwt) return {}
    return JSON.parse(atob(jwt))
}


export function checkAuth() {
    const authUser = getAuthUser()
    return (authUser && !isEmpty(authUser))
}
