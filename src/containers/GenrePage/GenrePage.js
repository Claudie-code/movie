import React, { useEffect, useState } from 'react';
import Title from "../../components/Title";
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import MovieCardList from './MovieCardList';
import { useParams } from 'react-router-dom';

function GenrePage() {
    const { id, name } = useParams();
    const [moviesGenre, setMoviesGenre] = useState([]) 
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}&with_watch_monetization_types=flatrate`, {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
    })
    .then(response => response.json())
    .then(json => {
        const data = json;
        setMoviesGenre(data.results)
    })
    .catch(err => {
        console.error(err);
    });
    }, [page, id])

    return (
        <React.Fragment>
            <Title>Films {name}</Title>
                <Grid container justifyContent="center" spacing={3}>
                    <MovieCardList movies={moviesGenre} />
                    <Pagination count={10} page={page} onChange={(event, value) => setPage(value)} />
                </Grid>
        </React.Fragment>
    );
}

export default GenrePage;