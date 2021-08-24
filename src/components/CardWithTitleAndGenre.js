import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CardContent, Typography } from '@material-ui/core';
import FavoriteCheckbox from './FavoriteCheckbox';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 150,
        height: 200,
        margin: 10
    },
    cover: {
      width: 150,
      height: 230,
      display: 'flex',
      justifyContent: "center",
      alignItems: 'center',
    },
    padding: {
        padding: theme.spacing(0.5)
    }
  }));

function CardWithTitleAndGenre({ seriesAndMovies }) {
    const classes = useStyles();
    const [ seriesGenres, setGenresSeries ] = useState([]);

    /*const findGenre = (genreId) => {
        const result = seriesGenres.filter(genre => genre.id === genreId);  
        return result[0].name;
    }*/
    
    useEffect(() => {
        fetch(`
        https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&page=1`, 
        {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
        })
        .then(response => response.json())
        .then(json => {
            const data = json;
            const arrGenresSeries = data.results
            setGenresSeries(arrGenresSeries);
        })
        .catch(err => {
            console.error(err);
        });
    }, [])

    return (
        <>
            {seriesAndMovies && seriesAndMovies.map(element => (
                <CardActionArea key={element.id} className={classes.root}>
                    <CardMedia
                        className={classes.cover}
                        image={`https://image.tmdb.org/t/p/w780${element.poster_path && element.poster_path}`}
                        title={element.name ? element.name : element.title}
                    >
                    </CardMedia>
                    <FavoriteCheckbox movie={element}/>
                    <CardContent className={classes.padding}>
                        <Typography variant="subtitle1" component="h3">
                            {element.name ? element.name : element.title}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {/*element.genre_ids? findGenre(element.genre_ids[0]) : element.genres[0].name*/}
                        </Typography>
                    </CardContent>         
                </CardActionArea>
            ))}
        </>
    );
}

export default CardWithTitleAndGenre;