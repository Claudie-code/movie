import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

function BandeAnnonce({ movieOrSerieData, movieOrSerie, width, height }) {
    const [trailerUrl, setTrailerUrl] = useState(null)

    useEffect(() => {
        fetch(`
            https://api.themoviedb.org/3/${movieOrSerie}/${movieOrSerieData.id}/videos?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR`, 
            {
                "method": "GET",
                "headers": {
                    "Content-type": "application/json",
                }
            }
        )
        .then(response => response.json())
        .then(json => {
            console.log(json, movieOrSerie)
            const data = json.results[0].key;
            setTrailerUrl(data);
        })
        .catch(err => {
            console.error(err);
        });
    }, [])

    return (
        <>
        {trailerUrl &&
            <ReactPlayer 
            width={width} 
            height={height} 
            url={`https://www.youtube.com/watch?v=${trailerUrl}`} 
        />}
        </>
    );
}

export default BandeAnnonce;