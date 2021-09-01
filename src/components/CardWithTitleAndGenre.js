import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Typography, CardMedia, CardActionArea, Card, CardActions } from '@material-ui/core';
import FavoriteCheckbox from './FavoriteCheckbox';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 200,
    }
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
                <Card key={element.id} className={classes.root}>
                    <CardActionArea >
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
                        <FavoriteCheckbox movie={element}/>
                    </CardActions>         
                </Card>
            ))}
        </>
    );
}

export default CardWithTitleAndGenre;