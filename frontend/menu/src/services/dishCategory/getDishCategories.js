import {DISH_CATEGORIES} from "../settings.js"
import { fetchData } from "../fetchData.js"

export default function  getDishCategories(){
    const apiData =  fetchData(DISH_CATEGORIES);
    const data = apiData.read();
    return data;
}
