import {DISHES_END_POINT} from '../settings.js';

const handleErrors = async (response) => {
    if(!response.ok){
        // console.log('response', response)
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
    return response
}

export default async function deleteDish(dishId, token, csfrToken,){
    return fetch(DISHES_END_POINT + dishId + '/', {
        method: 'DELETE',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Token` + token, 
            'X-CSRFToken':  csfrToken
        },
    })
    .then(handleErrors)
    .then(data => {
        return data
    })
    .catch(error => {
        throw error.message
    })
}