import { Box, CardMedia, Grid, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react';
import Title from "../../components/Title";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      height: 400,
    },
    mediaRoot: {
        margin: 5,
        width: 250,
        height: 390
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      gap: '5%',
      display: "flex",
      flexDirection: "column"
    },
    cover: {
        width: 250,
        height: 390,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
}));

function GenrePage(props) {
    const classes = useStyles();
    const { id, name } = props.match.params;

    const [genreMovie, setGenreMovie] = useState([]) 
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}&with_watch_monetization_types=flatrate`, {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
    })
    .then(response => response.json())
    .then(json => {
        const data = json;
        setGenreMovie(data.results)
    })
    .catch(err => {
        console.error(err);
    });
    }, [page, id])

    return (
        <React.Fragment>
            <Title>Films {name}</Title>
                <Grid container justifyContent="center" spacing={3}>
                    {genreMovie.map(movie => (
                        <Grid item xs={12} key={movie.id}>
                            <Card className={classes.root}>
                                <CardActionArea href={`/movie/${movie.id}`} className={classes.mediaRoot}>
                                    <CardMedia
                                        className={classes.cover}
                                        image={`https://image.tmdb.org/t/p/w780${movie && movie.poster_path}`}
                                        title={movie.title}
                                    />
                                </CardActionArea>
                                <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Box>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {movie.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary" component="p">
                                            {movie.release_date}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" color="textSecondary" component="p">
                                        {movie.overview}
                                    </Typography>
                                    
                                </CardContent>
                                <div className={classes.rating}>
                                    <Rating name="size-medium" value={(movie.vote_average * 5) / 10} readOnly/>
                                </div>
                                </div>
                            </Card>
                        </Grid>
                    ))}
                    <Pagination count={10} page={page} onChange={handleChange} />

                </Grid>
        </React.Fragment>
    );
}

export default GenrePage;