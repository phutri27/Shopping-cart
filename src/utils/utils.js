import { api_host, api_key } from "../../api_key/key";
async function fetchApi(){
    const url = 'https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4208&country=US&sort=freshness&currency=USD&sizeSchema=US&limit=15&lang=en-US';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': api_key,
            'x-rapidapi-host': api_host
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok)
            throw Error(`Network error, Error ${response.status}`)
        const result = await response.json();
        return result.products
    } catch (error) {
        console.error(error);
    }
}

export default fetchApi