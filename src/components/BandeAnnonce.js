import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    videocontainer: {
        width: '100%',
        height: 0,
        paddingBottom: "56.25%",
        overflow: 'hidden',
        position: 'relative',

        '& iframe, img': {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
        }
    }
}));

function BandeAnnonce({ movieOrSerieData, movieOrSerie, width, height }) {
    const classes = useStyles();
    let location = useLocation();
    const [trailerUrl, setTrailerUrl] = useState(null)

    useEffect(() => {
        fetch(`
            https://api.themoviedb.org/3/${movieOrSerie}/${movieOrSerieData.id}/videos?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR`, 
            {
                "method": "GET",
                "headers": {
                    "Content-type": "application/json",
                }
            }
        )
        .then(response => response.json())
        .then(json => {
            if (json.results.length > 0) {
                const data = json.results[0].key;
                setTrailerUrl(data);
            }
        })
        .catch(err => {
            console.error(err);
        });
    }, [movieOrSerie, movieOrSerieData.id])

    return (
        <div className={classes.videocontainer}>
        {trailerUrl ? 
            <iframe src={`https://www.youtube.com/embed/${trailerUrl}`} 
                width="100%" 
                height="315"
                frameBorder="0" 
                allowFullScreen>
            </iframe>: 
            location.pathname === "/" ?
            <iframe src={`https://www.youtube.com/embed/D00MGLC91-M`} 
                width="100%" 
                height="315"
                frameBorder="0" 
                allowFullScreen>
            </iframe> :
            movieOrSerieData.backdrop_path ?
            <img
                width={width}
                height={height}
                src={`https://image.tmdb.org/t/p/w1280${movieOrSerieData.backdrop_path}`}
                alt={movieOrSerieData.title || movieOrSerieData.name}
            /> : 
            <img
                height={height}
                style={{margin:"auto"}}
                src={`https://image.tmdb.org/t/p/w1280${movieOrSerieData.poster_path}`}
                alt={movieOrSerieData.title || movieOrSerieData.name}
            />
        }
        </div>
    );
}

export default BandeAnnonce;