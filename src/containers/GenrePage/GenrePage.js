import { useParams } from 'react-router-dom';
import SearchPage from '../../components/SearchPage';

function GenrePage() {
    const { id, name } = useParams();

    const apiURL = (id, page) => {
        return `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&with_genres=${id}&page=${page}&sort_by=popularity.desc`
    };

    return (
        <SearchPage apiURL={apiURL} name={name} search={id} />
    );
}

export default GenrePage;