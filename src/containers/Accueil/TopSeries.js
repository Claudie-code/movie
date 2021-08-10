import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Box, CardContent, Typography } from '@material-ui/core';

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

function TopSeries(props) {
    const classes = useStyles();
    const idGenre = props.serieTop.genre_ids[0];
    const [ genre, setGenre ] = useState(null)

    useEffect(() => {
        fetch(`
        https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&name="aventure"`, 
        {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
        })
        .then(response => response.json())
        .then(json => {
            const data = json;
            const genreTarget = data.genres.find(element => idGenre == element.id);
            setGenre(genreTarget)
        })
        .catch(err => {
            console.error(err);
        });
    }, [idGenre])

    return (
        <Box>
            <CardActionArea className={classes.root}>
                <CardMedia
                className={classes.cover}
                image={`https://image.tmdb.org/t/p/w780${props.serieTop && props.serieTop.poster_path}`}
                title={props.serieTop.name}
                >
                </CardMedia> 
                <CardContent className={classes.padding}>
                    <Typography gutterBottom variant="subtitle1" component="h3">
                        {props.serieTop.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {genre.name}
                    </Typography>
                </CardContent>         
            </CardActionArea>
        </Box>
    );
}

export default TopSeries;