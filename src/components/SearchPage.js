import { useState } from "react";
import Title from "./Title";
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import { useApiData } from '../hooks/useApiData';
import MovieSerieCardList from './MovieSerieCardList';
import Loader from './Loader/Loader';

export default function SearchPage({apiURL, search, name}) {
    const [page, setPage] = useState(1);
    
    const [ searchResults, loading ] = useApiData(apiURL(search, page), search, page);

    return (
        <>
            {loading ? 
                <Loader /> :
                <>
                    <Title>Résultats pour {name ||search}</Title>
                    <Grid container justifyContent="center" spacing={3}>
                        {searchResults && <MovieSerieCardList datas={searchResults} />}
                        <Pagination count={10} page={page} onChange={(event, value) => setPage(value)} />
                    </Grid>
                </>
            }
        </>
    );
}