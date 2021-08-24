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
    const [ genresSeries, setGenresSeries ] = useState();

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
    
    return (

        <Paper className={classes.paper}>
            <Title>Profil de {currentUser.displayName}</Title>
            <Box display="flex">
                <CardWithTitleAndGenre seriesAndMovies={favorites}/> 
            </Box>
        </Paper>

    )
}
