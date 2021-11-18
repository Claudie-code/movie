import { makeStyles, Paper, Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Title from "./Title";
import BandeAnnonce from "./BandeAnnonce";
import GenreListButton from "./GenreListButton";
import FavoriteCheckBox from './FavoriteCheckbox';
import ReleaseDate from './ReleaseDate';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflowX: "auto",
        flexDirection: "column",
        minHeight: 500
    },
    rating: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing(2),
        gap: "10px",
        justifyContent: "space-between",
        '@media (max-width:800px)': {
            flexDirection: "column",
        },
    }
}));

export default function MovieSeriePageDetails({ movieOrSerieData, movieOrSerie }) {
    const { currentUser } = useAuth();
    const classes = useStyles();

    return (
        <>
        {movieOrSerieData &&
        <Paper className={classes.paper}>
            <Box display="flex" justifyContent="space-between">
                <Title>{movieOrSerieData.name || movieOrSerieData.title}</Title>
                {currentUser && <FavoriteCheckBox serieAndMovie={movieOrSerieData}/>}
            </Box>
            <BandeAnnonce movieOrSerieData={movieOrSerieData} movieOrSerie={movieOrSerie} width='100%' height="650px"/>
            <Box className={classes.rating}>
                <GenreListButton genres={movieOrSerieData.genres} />
                <Rating name="size-medium" value={(movieOrSerieData.vote_average * 5) / 10} readOnly />
            </Box>
            <ReleaseDate releaseDate={movieOrSerieData.release_date} />
            <Typography variant="body1" gutterBottom>
                {movieOrSerieData.overview || "Pas de résumé"}
            </Typography>
        </Paper>
        }
        </>
    )
}