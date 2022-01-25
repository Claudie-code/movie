import { Box, CardMedia, Grid, Typography, Card, CardContent, CardActionArea, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import ReleaseDate from './ReleaseDate';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '@media (max-width:650px)': {
            flexDirection: "column"
        },
    },
    mediaRoot: {
        width: 250,
        height: 390,
        '@media (max-width:650px)': {
            margin: "auto",
            width: 180,
            height: 290,
        },
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: "100%"
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
        '@media (max-width:650px)': {
            width: 180,
            height: 290,
        },
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: "space-between",
      padding: theme.spacing(1),
    },
    button: {
        fontStyle: "italic",
        color: theme.palette.primary.main
    }
}));

function MovieSerieCardList({ datas }) {
    const classes = useStyles();
    const history = useHistory();
    console.log("datas", datas)
    return (
        <>
        {datas.map(data => (
            <Grid item xs={12} key={data.id}>
                <Card className={classes.root}>
                    {console.log('data', data.media_type === "tv" ? 
                            `/serie/${data.id}` : 
                            data.media_type === "person" ?
                            `/people/${data.id}` :
                            `/movie/${data.id}`)}
                    <CardActionArea 
                        href={
                            data.media_type === "tv" ? 
                            `/serie/${data.id}` : 
                            data.media_type === "person" ?
                            `/people/${data.id}` :
                            `/movie/${data.id}`
                        } 
                        className={classes.mediaRoot}
                    >
                        <CardMedia
                            className={classes.cover}
                            image={`https://image.tmdb.org/t/p/w780${data?.poster_path || data.profile_path}`}
                            title={data.title}
                        />
                    </CardActionArea>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Box>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {data.title || data.name}
                                </Typography>
                                {data.release_date && <ReleaseDate>{data.release_date}</ReleaseDate>}
                            </Box>
                            {data.overview &&
                                <Typography variant="body1" color="textSecondary" component="p">
                                    {data.overview.slice(0,200) + "..."} 
                                    <Link className={classes.button} to={data.name? `/serie/${data.id}`: `/movie/${data.id}`}> Lire la suite</Link>
                                </Typography>
                            }
                        </CardContent>
                        <div className={classes.rating}>
                            {data.vote_average && 
                                <Rating name="size-medium" value={(data.vote_average * 5) / 10}readOnly/>
                            }
                            <Button 
                                size="large" 
                                variant="outlined" 
                                color="primary"
                                gutterRight
                                onClick={()=> {history.replace(`${
                                    data.media_type === "tv" ? 
                                    `/serie/${data.id}` : 
                                    data.media_type === "person" ?
                                    `/people/${data.id}` :
                                    `/movie/${data.id}`
                                }`)}}
                            >
                                Voir
                            </Button>
                        </div>
                    </div>
                </Card>
            </Grid>
        ))}
        </>
    );
}

export default MovieSerieCardList;