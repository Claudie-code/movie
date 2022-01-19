import React, { useContext } from 'react';
import { useApiData } from '../hooks/useApiData';

const DataContext = React.createContext();

export function useData() {
    return useContext(DataContext)
}

export function DataProvider({children}) {
    const [popularMovies, loadingMovies] = useApiData(`
        https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate
    `);
    const [topRatedSeries, loadingSeries] = useApiData(`
        https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&page=1
    `);
    const [ moviesGenres ] = useApiData(`
        https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR
    `);

    const [ seriesGenres ] = useApiData(`
        https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR
    `);

    const value = {
        popularMovies,
        loadingMovies,
        topRatedSeries,
        loadingSeries,
        moviesGenres,
        seriesGenres,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

