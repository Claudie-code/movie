import MovieSeriePageDetails from '../../components/MovieSeriePageDetails';
import { useApiData } from '../../hooks/useApiData';
import Loader from '../../components/Loader/Loader';

export default function SeriePage(props) {
    const { id } = props.match.params;

    const [ serieDetails, loadingSerieDetails ] = useApiData(`
        https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR
    `);

    return (
        <>
        {loadingSerieDetails ?
            <Loader /> :
            <MovieSeriePageDetails movieOrSerieData={serieDetails} movieOrSerie="tv"/>
        }
        </>
    )
}