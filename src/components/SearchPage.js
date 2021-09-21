import { useState } from "react";
import Title from "../../components/Title";
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import { useApiData } from '../../hooks/useApiData';
import MovieCardList from '../GenrePage/MovieCardList';
import { useParams } from "react-router-dom";
import Loader from '../../components/Loader/Loader';

export default function SearchPage({apiURL, search, page, name}) {
    const { search } = useParams();
    const [page, setPage] = useState(1);
    
    const [ searchResults, loading ] = useApiData(`
        https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&query=${search}&page=${page}&include_adult=false&sort_by=popularity.desc`, search, page
    );

    return (
        <>
            {loading ? 
                <Loader /> :
                <>
                    <Title>Résultats pour {search}</Title>
                    <Grid container justifyContent="center" spacing={3}>
                        {searchResults && <MovieCardList movies={searchResults} />}
                        <Pagination count={10} page={page} onChange={(event, value) => setPage(value)} />
                    </Grid>
                </>
            }
        </>
    );
}