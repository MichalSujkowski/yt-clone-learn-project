import axios from 'axios';


export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
    method: 'GET',
    url: BASE_URL,
    params: {
        maxResults: 50,
        // order: 'date'
    },

    headers: {
        'X-RapidAPI-Key': '9e535c2b00msha8a0861385bd035p157ce5jsn26240036d2b2',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

export const fetchFromApi = async (url) => {
    const {data} = await axios.get(`${BASE_URL}/${url}`, options);

    return data
}