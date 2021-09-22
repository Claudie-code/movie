import MovieSerieDetails from '../../components/MovieSerieDetails';
import { useApiDataDetails } from '../../hooks/useApiDataDetails';

export default function SeriePage(props) {
    const { id } = props.match.params;

    const serieDetails = useApiDataDetails(`
        https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR
    `);

    return (
        <MovieSerieDetails movieOrSerieData={serieDetails} movieOrSerie="tv"/>
    )
}