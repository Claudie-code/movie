import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router';

function BandeAnnonce({ movieOrSerieData, movieOrSerie, width, height }) {
    let location = useLocation();
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
            if (json.results.length > 0) {
                const data = json.results[0].key;
                setTrailerUrl(data);
            }
        })
        .catch(err => {
            console.error(err);
        });
    }, [movieOrSerie, movieOrSerieData.id])

    return (
        <>
        {trailerUrl ? 
            <ReactPlayer 
                width={width} 
                height={height} 
                url={`https://www.youtube.com/watch?v=${trailerUrl}`}
            /> : 
            location.pathname === "/" ?
            <ReactPlayer 
                width={width} 
                height={height} 
                url={`https://www.youtube.com/watch?v=D00MGLC91-M`}
            /> :
            movieOrSerieData.backdrop_path ?
            <img
                width={width}
                height={height}
                src={`https://image.tmdb.org/t/p/w1280${movieOrSerieData.backdrop_path}`}
                alt={movieOrSerieData.title || movieOrSerieData.name}
            /> : 
            <img
                height={height}
                style={{margin:"auto"}}
                src={`https://image.tmdb.org/t/p/w1280${movieOrSerieData.poster_path}`}
                alt={movieOrSerieData.title || movieOrSerieData.name}
            />
        }
        </>
    );
}

export default BandeAnnonce;