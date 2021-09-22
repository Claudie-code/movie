import { Box, CardMedia, Grid, Typography, Card, CardContent, CardActionArea } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
    button: {
        fontStyle: "italic"
    }
}));

function GenrePage(props) {
    const classes = useStyles();

    return (
        <>
        {props.movies.map(movie => (
            <Grid item xs={12} key={movie.id}>
                <Card className={classes.root}>
                    <CardActionArea href={movie.name? `/serie/${movie.id}`: `/movie/${movie.id}`} className={classes.mediaRoot}>
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
                                {movie.title || movie.name}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" component="p">
                                {movie.release_date}
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {movie.overview.slice(0,200) + "..."} 
                            <Link className={classes.button} to={movie.name? `/serie/${movie.id}`: `/movie/${movie.id}`}> Lire la suite</Link>
                        </Typography>
                    </CardContent>
                    <div className={classes.rating}>
                        <Rating name="size-medium" value={(movie.vote_average * 5) / 10} readOnly/>
                    </div>
                    </div>
                </Card>
            </Grid>
        ))}
        </>
    );
}

export default GenrePage;