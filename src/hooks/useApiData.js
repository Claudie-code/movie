import { useState, useEffect } from 'react';

export const useApiData = (url, search, page) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url, {
            "method": "GET",
            "headers": {
                "Content-type": "application/json",
            }
        })
        .then(response => response.json())
        .then(json => {
            if(json.results) {
                setData(json.results)
            } else if (json.genres) {
                setData(json.genres)
            } else if ((!json.results && !json.genres)) {
                setData(json)
            }
        })
        .catch(err => {
            console.error(err);
        })
        .finally(
            () => {
              setLoading(false);
            },
        );
    }, [page, search, url]);

    return [data, loading];
};