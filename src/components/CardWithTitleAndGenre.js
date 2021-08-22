import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 150,
        height: 200,
        margin: 5
    },
    cover: {
      width: 150,
      height: 230,
      display: 'flex',
      justifyContent: "center",
      alignItems: 'center',
    },
    playIcon: {
      color: "white",
      height: 40,
      width: 40,
      border: "2px solid white",
      borderRadius: "50%",
      '&:hover': {
        color: theme.palette.primary.main,
        border: "2px solid" + theme.palette.primary.main,
      }
    },
    padding: {
        padding: theme.spacing(0.5)
    }
  }));

function CardWithTitleAndGenre({ seriesAndMovies, genres }) {
    const classes = useStyles();

    const findGenre = (genreId) => {
        const result = genres.filter(genre => genre.id === genreId);  
        return result[0].name;
    }

    return (
        <>
            {seriesAndMovies && seriesAndMovies.map(element => (
                <CardActionArea key={element.id} className={classes.root}>
                    <CardMedia
                        className={classes.cover}
                        image={`https://image.tmdb.org/t/p/w780${element.poster_path && element.poster_path}`}
                        title={element.name && element.name}
                    >
                    </CardMedia> 
                    <CardContent className={classes.padding}>
                        <Typography gutterBottom variant="subtitle1" component="h3">
                            {element.name ? element.name : element.title}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {element.genre_ids? findGenre(element.genre_ids[0]) : element.genres[0].name}
                        </Typography>
                    </CardContent>         
                </CardActionArea>
            ))}
        </>
    );
}

export default CardWithTitleAndGenre;