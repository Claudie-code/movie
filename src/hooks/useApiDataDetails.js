import { useState, useEffect } from 'react';

export const useApiDataDetails = (url) => {
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
            setData(json)
        })
        .catch(err => {
            console.error(err);
        });
    }, [])

    return data;
};