import { makeStyles, Paper, Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
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

export default function Profile() {
    const classes = useStyles();
    const { currentUser, getFavorites } = useAuth();
    const [ favorites, setFavorites ] = useState();
    const [ genres, setGenres ] = useState();

    useEffect(() => {
        async function fetchData() {
            const docRef = await getFavorites();

            if (docRef.exists) {
                setFavorites(docRef.data().favorites);
            } else {
                console.log("Cette collection n'existe pas");
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        fetch(`
        https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR`, 
        {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
        })
        .then(response => response.json())
        .then(json => {
            const data = json;
            const arrGenres = data.genres
            setGenres(arrGenres);
        })
        .catch(err => {
            console.error(err);
        });
    }, [])
    console.log(favorites)
    return (

        <Paper className={classes.paper}>
            <Title>Profil de {currentUser.displayName}</Title>
            <Box display="flex">
                <CardWithTitleAndGenre seriesAndMovies={favorites} genres={genres} /> 
            </Box>
        </Paper>

    )
}
