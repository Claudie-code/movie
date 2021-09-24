import MovieSerieDetails from '../../components/MovieSerieDetails';
import { useApiData } from '../../hooks/useApiData';

export default function SeriePage(props) {
    const { id } = props.match.params;

    const serieDetails = useApiData(`
        https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR
    `);

    return (
        <MovieSerieDetails movieOrSerieData={serieDetails} movieOrSerie="tv"/>
    )
}