import { makeStyles, Paper, Box, Typography } from '@material-ui/core';
import Title from "../../components/Title";
import CardsWithTitleAndGenre from "../../components/CardsWithTitleAndGenre";
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflowX: "auto",
        flexDirection: "column",
        minHeight: 450
    },
}));

export default function Profile() {
    const classes = useStyles();
    const { currentUser, favorites } = useAuth();
    const { seriesGenres, moviesGenres } = useData();

    return (

        <Paper className={classes.paper}>
            <Title>Profil de {currentUser.displayName}</Title>
            <Typography component="h3" variant="h4" gutterBottom>
                    Mes favoris
            </Typography>
            <Box display="flex">
                {favorites.length > 0 ?
                    <CardsWithTitleAndGenre 
                        seriesAndMovies={favorites} 
                        seriesGenres={seriesGenres} 
                        moviesGenres={moviesGenres}
                    /> :
                    "Pas de favoris"
                }

            </Box>
        </Paper>

    )
}
