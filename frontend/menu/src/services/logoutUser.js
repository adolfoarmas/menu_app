import {USER_LOGOUT_END_POINT} from "./settings.js"

const handleErrors = (response) => {
    if(!response.ok){
        return {'error': response.statusText}
    }
    return response
}

export default async function logoutUser(userLogged){

const csrftokenValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1];

return fetch(USER_LOGOUT_END_POINT, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token` + userLogged,
        'X-CSRFToken': csrftokenValue
    },
    body: JSON.stringify()
})
.then(handleErrors)
.then(data => {
    if(!data.error){
        window.localStorage.removeItem('logedUserToken')
        window.localStorage.removeItem('logedUserId')
        window.localStorage.removeItem('logedUserName')
        document.cookie = "sessionid=; Max-Age=0;secure; path=/"
        document.cookie = "csrftoken=; Max-Age=0;secure; path=/"
        return data.json()
    }
    return data
    })
}