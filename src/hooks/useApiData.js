import { useState, useEffect } from 'react';

export const useApiData = (url, page) => {
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
            setData(json.results)
        })
        .catch(err => {
            console.error(err);
        });
    }, [page])

    return data;
};