import { useState } from 'react';
import Title from "../../components/Title";
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import MovieCardList from './MovieCardList';
import { useParams } from 'react-router-dom';
import { useApiData } from '../../hooks/useApiData';

function GenrePage() {
    const { id, name } = useParams();
    const [page, setPage] = useState(1);

    const [ moviesGenre, loading ] = useApiData(`
        https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&sort_by=popularity.desc&include_video=false&page=${page}&with_genres=${id}&with_watch_monetization_types=flatrate
    `, id, page);

    return (
        <>
            <Title>Films {name}</Title>
                <Grid container justifyContent="center" spacing={3}>
                    {moviesGenre && <MovieCardList movies={moviesGenre} />}
                    <Pagination count={10} page={page} onChange={(event, value) => setPage(value)} />
                </Grid>
        </>
    );
}

export default GenrePage;