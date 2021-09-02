import { makeStyles, Paper, Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Title from "./components/Title";
import BandeAnnonce from "./components/BandeAnnonce";
import GenreListButton from "./components/GenreListButton";
import FavoriteCheckBox from './components/FavoriteCheckbox';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

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

export default function MoviePage({ movieOrSerie }) {
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
            <Typography variant="subtitle1" gutterBottom>
                Sortie le {dayjs(movieOrSerie.release_date).locale('fr').format("DD MMMM YYYY")}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {movieOrSerie.overview}
            </Typography>
        </Paper>
        }
        </>
    )
}