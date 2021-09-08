import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Typography, CardMedia, CardActionArea, Paper, CardActions } from '@material-ui/core';
import FavoriteCheckbox from './FavoriteCheckbox';
import PlayButton from "./PlayButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 230,
        marginRight: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    cover: {
        width: 230,
        height: 330,
        borderRadius: ".2rem .2rem 0 0",
        display: "flex",
        alignItems: "flex-end"
    },
    content: {
        paddingTop: "2rem",
        background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,.45) 35%, rgba(0,0,0,.60) 50%, rgba(0,0,0,.75) 75%, rgba(0,0,0,0.90) 100%)",
        color: "#fff",
        width: "100%",
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    }
}));

function CardWithTitleAndGenre({ seriesAndMovies, seriesGenres, movie }) {
    const classes = useStyles();

    const findGenre = (genreId) => {
        const result = seriesGenres.filter(genre => genre.id === genreId);  
        return result[0].name;
    }
    console.log(seriesGenres)
    return (
        <>
            {seriesAndMovies && seriesAndMovies.map(element => (
                <Paper elevation={3} key={element.id} className={classes.root}>
                    <CardActionArea key={element.id} href={movie ? `/movie/${element.id}` : `/serie/${element.id}`}>
                        <CardMedia
                            alt={element.name ? element.name : element.title}
                            className={classes.cover}
                            image={`https://image.tmdb.org/t/p/w780${element.poster_path && element.poster_path}`}
                            title={element.name ? element.name : element.title}
                        >
                            <CardContent className={classes.content}>
                                <Typography variant="subtitle1" component="h3">
                                    {element.name ? element.name : element.title}
                                </Typography>
                                <Typography variant="overline" component="p">
                                    {element.genre_ids? findGenre(element.genre_ids[0]) : element.genres[0].name}
                                </Typography>
                            </CardContent>
                        </CardMedia>
                    </CardActionArea>
                    <CardActions>
                        <FavoriteCheckbox serieAndMovie={element} />
                        <PlayButton /> 
                    </CardActions>         
                </Paper>
            ))}
        </>
    );
}

export default CardWithTitleAndGenre;