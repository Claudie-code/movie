import { makeStyles, Paper, Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Title from "./Title";
import BandeAnnonce from "./BandeAnnonce";
import GenreListButton from "./GenreListButton";
import FavoriteCheckBox from './FavoriteCheckbox';
import ReleaseDate from './ReleaseDate';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflowX: "auto",
        flexDirection: "column",
        minHeight: 500
    },
    margin: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
}));

export default function MovieSerieDetails({ movieOrSerie }) {
    const classes = useStyles();

    return (
        <>
        {movieOrSerie &&
        <Paper className={classes.paper}>
            <Box display="flex" justifyContent="space-between">
                <Title>{movieOrSerie.title}</Title>
                <FavoriteCheckBox movie={movieOrSerie}/>
            </Box>
            <BandeAnnonce movieOrSerie={movieOrSerie} width='100%' height="620px"/>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <GenreListButton genres={movieOrSerie.genres} />
                <Rating name="size-medium" value={(movieOrSerie.vote_average * 5) / 10} readOnly />
            </Box>
            <ReleaseDate releaseDate={movieOrSerie.release_date} />
            <Typography variant="body1" gutterBottom>
                {movieOrSerie.overview}
            </Typography>
        </Paper>
        }
        </>
    )
}