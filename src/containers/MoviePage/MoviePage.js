import React, { useState, useEffect } from 'react';
import MovieSerieDetails from '../../components/MovieSerieDetails';

export default function MoviePage(props) {
    const { id } = props.match.params;
    const [ movie, setMovie ] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR`, {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
    })
    .then(response => response.json())
    .then(json => {
        const data = json;
        setMovie(data)
    })
    .catch(err => {
        console.error(err);
    });
    }, [id])

    return (
        <MovieSerieDetails movieOrSerie={movie} />
    )
}
