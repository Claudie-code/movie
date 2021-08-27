import Title from "../../components/Title";
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useApiData } from '../../hooks/useApiData';
import MovieCardList from '../GenrePage/MovieCardList';
import { useState } from "react";

export default function SearchPage() {
    const { title } = useParams();
    const [page, setPage] = useState(1);
    console.log(title)
    const searchResults = useApiData(`
        https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=en-US&query=${title}&page=${page}&include_adult=false
    `);
    console.log(searchResults)
    return (
        <>
            <Title>Résultats pour {title}</Title>
                <Grid container justifyContent="center" spacing={3}>
                    <MovieCardList movies={searchResults} />
                    <Pagination count={10} page={page} onChange={(event, value) => setPage(value)} />
                </Grid>
        </>
    );
}