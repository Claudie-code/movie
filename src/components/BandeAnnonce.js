import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

function BandeAnnonce({ popularMovie, width, height }) {
    const [trailerUrl, setTrailerUrl] = useState(null)

    useEffect(() => {
        fetch(`
        https://api.themoviedb.org/3/movie/${popularMovie.id}/videos?api_key=96ab457e2f6f7c241da2c90db7997deb&language=fr-FR`, 
        {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
        })
        .then(response => response.json())
        .then(json => {
            const data = json.results[0].key;
            setTrailerUrl(data);
        })
        .catch(err => {
            console.error(err);
        });
    }, [])

    return (
        <ReactPlayer 
            width={width} 
            height={height} 
            url={`https://www.youtube.com/watch?v=${trailerUrl}`} 
        />
    );
}

export default BandeAnnonce;