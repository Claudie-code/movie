import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Typography, CardMedia, CardActionArea, Paper, CardActions } from '@material-ui/core';
import FavoriteCheckbox from './FavoriteCheckbox';
import PlayButton from "./PlayButton";

const useStyles = makeStyles((theme) => ({
    root: {
        display:"inline-block",
        width: 230,
        marginRight: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    margin: {
        marginRight: 1,
    },
    cover: {
        height: 330,
        borderRadius: ".2rem .2rem 0 0"
    },
}));

function CardWithTitleAndGenre({ seriesAndMovies }) {
    const classes = useStyles();

    /*const findGenre = (genreId) => {
        const result = seriesGenres.filter(genre => genre.id === genreId);  
        return result[0].name;
    }*/

    return (
        <>
            {seriesAndMovies && seriesAndMovies.map(element => (
                <Paper key={element.id} className={classes.root}>
                    <CardActionArea key={element.id} className={classes.root} >
                        <CardMedia
                            component="img"
                            alt={element.name ? element.name : element.title}
                            height="140"
                            width="140"
                            className={classes.cover}
                            image={`https://image.tmdb.org/t/p/w780${element.poster_path && element.poster_path}`}
                            title={element.name ? element.name : element.title}
                        >
                        </CardMedia>
                        <CardContent>
                            <Typography variant="subtitle1" component="h3">
                                {element.name ? element.name : element.title}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {/*element.genre_ids? findGenre(element.genre_ids[0]) : element.genres[0].name*/}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <FavoriteCheckbox movie={element} />
                        <PlayButton /> 
                    </CardActions>         
                </Paper>
            ))}
        </>
    );
}

export default CardWithTitleAndGenre;