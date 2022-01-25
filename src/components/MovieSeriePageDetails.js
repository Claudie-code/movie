import { makeStyles, Paper, Typography, Box, Button, TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Title from "./Title";
import Titleh3 from "./Titleh3";
import BandeAnnonce from "./BandeAnnonce";
import GenreListButton from "./GenreListButton";
import FavoriteCheckBox from './FavoriteCheckbox';
import ReleaseDate from './ReleaseDate';
import { useAuth } from '../contexts/AuthContext';
import CastCard from './CastCard';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflowX: "auto",
        flexDirection: "column",
        minHeight: 500,
        gap: theme.spacing(2),
    },
    rating: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing(2),
        gap: "10px",
        '@media (max-width:800px)': {
            flexDirection: "column",
        },
    },
    flex: {
        gap: theme.spacing(3),
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    comment: {
        display: "flex",
        gap: theme.spacing(2),
        flexDirection: "column",
    }
}));

export default function MovieSeriePageDetails({ movieOrSerieData, movieOrSerie }) {
    const [ newComment, setNewComment ] = useState("");
    const { currentUser } = useAuth();
    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
    };

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
            <ReleaseDate>
                {movieOrSerieData.release_date}
            </ReleaseDate>
            <Titleh3>Synopsis</Titleh3>
            <Typography variant="body1" gutterBottom>
                {movieOrSerieData.overview || "Pas de résumé"}
            </Typography>
            <Titleh3>Acteurs et actrices</Titleh3>
            <Box className={classes.flex}>
                {movieOrSerieData && 
                    movieOrSerieData.credits?.cast.slice(0, 5).map(cast => (
                        <CastCard key={cast.id} cast={cast} />
                    ))
                }
            </Box>
            <Titleh3>Commentaires</Titleh3>
            {currentUser ?
                <form onSubmit={handleSubmit} className={classes.comment}>
                    <TextField
                        label="Écrire un commentaire"
                        multiline
                        rows={4}
                        maxRows={4}
                        variant="outlined"
                        size="small"
                        color="secondary"
                        value={newComment}
                        onChange={event => setNewComment(event.target.value)}
                    />
                    <div>
                    <Button color="secondary" variant="contained" fullWidth={false}>Valider</Button>

                    </div>
                </form> :
                <Button>Écrire un commentaire</Button>
            }
        </Paper>
        }
        </>
    )
}