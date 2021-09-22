import { useState, useEffect } from 'react';

export const useApiDataGenres = (url) => {
    const [data, setData] = useState();

    useEffect(() => {
        fetch(url, {
            "method": "GET",
            "headers": {
                "Content-type": "application/json",
            }
        })
        .then(response => response.json())
        .then(json => {
            const data = json;
            setData(data.genres)
        })
        .catch(err => {
            console.error(err);
        });
    }, [url])

    return data;
};