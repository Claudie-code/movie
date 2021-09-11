import { makeStyles, Paper, Box } from '@material-ui/core';
import Title from "../../components/Title";
import CardWithTitleAndGenre from "../../components/CardWithTitleAndGenre";
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflowX: "auto",
        flexDirection: "column",
        minHeight: 450
    },
}));

export default function Profile({ seriesGenres, moviesGenres }) {
    const classes = useStyles();
    const { currentUser, favorites } = useAuth();
    console.log("favoris profile", favorites)
    return (

        <Paper className={classes.paper}>
            <Title>Profil de {currentUser.displayName}</Title>
            <Box display="flex">
                <CardWithTitleAndGenre seriesAndMovies={favorites} seriesGenres={seriesGenres} moviesGenres={moviesGenres}/> 
            </Box>
        </Paper>

    )
}
