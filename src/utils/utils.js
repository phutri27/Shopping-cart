import { api_host, api_key } from "../../api_key/key";

async function fetchApi(link){
    const url = link
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