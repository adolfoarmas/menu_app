import {DISH_CATEGORIES_END_POINT} from '../settings.js'


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

export default async function createDishCategory(payload, token, csfrToken,){
    return fetch(DISH_CATEGORIES_END_POINT, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Token` + token, 
            'X-CSRFToken':  csfrToken
        },
        body: payload
    })
    .then(handleErrors)
    .then(data => {
        return data
    })
    .catch(error => {
        throw error.message
    })
}