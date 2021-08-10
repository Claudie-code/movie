import { makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Title from "../../components/Title";
import { useAuth } from '../../contexts/AuthContext';
import BandeAnnonce from "../../components/BandeAnnonce";
import GenreListButton from "../../components/GenreListButton";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflowX: "auto",
        flexDirection: "column",
        minHeight: 450
    },
    margin: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
}));

export default function MoviePage(props) {
    const classes = useStyles();
    const { currentUser } = useAuth();
    const { id } = props.match.params;
    const [ movie, setMovie ] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR`, {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
    })
    .then(response => response.json())
    .then(json => {
        const data = json;
        setMovie(data)
    })
    .catch(err => {
        console.error(err);
    });
    }, [id])

    console.log(movie)
    return (
        <>
        {movie &&
        <Paper className={classes.paper}>
            <Title>{movie.title}</Title>
            <BandeAnnonce movieBa={movie} width='100%' height="500px"/>
            <GenreListButton genres={movie.genres} />
            <Typography variant="subtitle1" gutterBottom>
                Sortie le {movie.release_date}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {movie.overview}
            </Typography>
        </Paper>
        }
        </>
    )
}
