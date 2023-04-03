import {DISHES_END_POINT} from "../settings.js"

const handleErrors = (response) => {
    if(!response.ok){
        const errorMessage = {'error': response.statusText}
        return errorMessage
    }
    return response  
}

export default async function getDish(category){
    const respuesta =  await fetch(DISHES_END_POINT + "?category=" + String(category.id))
    const json = await respuesta.json()
    return json;
}
