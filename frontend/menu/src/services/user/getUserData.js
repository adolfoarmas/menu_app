import {USERS_END_POINT} from '../settings.js'


const handleErrors = (response) => {
    if(!response.ok){
        return {'error':response.statusText}
    }
    return response
}

export default async function getUserLoggedTokenData(username, token, csfrToken,){
    return fetch(USERS_END_POINT + '?username=' + username, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token` + token, 
            'X-CSRFToken':  csfrToken
        },
        //body: JSON.stringify(payload)
    })
    .then(handleErrors)
    .then(data => {
        if(!data.error){
            return data.json()
        }
        return data
        })
}