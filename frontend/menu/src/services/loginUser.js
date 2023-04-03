import {USER_LOGIN_END_POINT} from "./settings.js"

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

export default async function loginUser(credentials){
    console.log('credentials', credentials)
    return fetch(USER_LOGIN_END_POINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(handleErrors)
    .then(data => {
        return data
    })
    .catch(error => {
        throw error.message
    })
}