import { useParams } from "react-router-dom";
import SearchPage from "../../components/SearchPage";

export default function SearchQueryPage() {
    const { search } = useParams();

    const apiURL = (search, page) => {
        return `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&query=${search}&page=${page}&sort_by=popularity.desc`
    };

    return (
        <SearchPage apiURL={apiURL} search={search} />
    );
}