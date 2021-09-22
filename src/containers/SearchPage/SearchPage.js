import { useState } from "react";
import Title from "../../components/Title";
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import { useApiData } from '../../hooks/useApiData';
import MovieCardList from '../GenrePage/MovieCardList';
import { useParams } from "react-router-dom";
import Loader from '../../components/Loader/Loader';

export default function SearchPage() {
    const { search } = useParams();
    const [page, setPage] = useState(1);

    const apiURL = (search, page) => {
        return `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&query=${search}&page=${page}&sort_by=popularity.desc`
    };

    return (
        <SearchPage apiURL={apiURL} search={search} />
    );
}