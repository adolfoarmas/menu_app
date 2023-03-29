import {DISHES_END_POINT} from '../settings.js'

const handleErrors = async (response) => {
    if(!response.ok){
        console.log('response', response)
        let errorMessage = ''
        const ApiMessages = await response.json();
        console.log(await ApiMessages)
        Object.entries(ApiMessages).forEach(([key, value]) => {
            const messages = value.join('\n');
            errorMessage += `${key}: ${messages}\n`;
            console.log('errorMessage', errorMessage)
          });
        throw new Error (errorMessage);
    }
    return response.json()
}

export default async function editDish(payload, dishId, token, csfrToken){
    console.log(payload)
    return fetch(DISHES_END_POINT + dishId + '/', {
        method: 'PUT',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `Token` + token, 
            'X-CSRFToken':  csfrToken
        },
        body: payload
    })
    .then(handleErrors)
    .then(async data => {
        return await data
    })
    .catch(error => {
        throw error.message
    })
}