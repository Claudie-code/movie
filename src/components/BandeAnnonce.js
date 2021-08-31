import { useApiData } from '../hooks/useApiData';
import ReactPlayer from 'react-player';

function BandeAnnonce({ movieOrSerie, width, height }) {
    const trailerUrl = useApiData(`
        https://api.themoviedb.org/3/movie/${movieOrSerie.id}/videos?api_key=96ab457e2f6f7c241da2c90db7997deb&language=fr-FR`, movieOrSerie
    );
    console.log()
    return (
        <ReactPlayer 
            width={width} 
            height={height} 
            url={`https://www.youtube.com/watch?v=${trailerUrl ? trailerUrl[0].key : "ebffrCkW-Dw"}`} 
        />
    );
}

export default BandeAnnonce;