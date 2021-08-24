import { makeStyles, Paper, Typography, Box, Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Title from "../../components/Title";
import { useAuth } from '../../contexts/AuthContext';
import BandeAnnonce from "../../components/BandeAnnonce";
import GenreListButton from "../../components/GenreListButton";
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'
import { useLocation } from 'react-router-dom';

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

export default function MoviePage(props) {
    const classes = useStyles();
    const { addFavoritesUserCollection, removeFavoritesUserCollection } = useAuth();
    const { id } = props.match.params;
    const location = useLocation()
    const { movie } = location.state;

    const handleChange = async (event, movie) => {
        if (event.target.checked) {
            await addFavoritesUserCollection(movie);
        } else {
            await removeFavoritesUserCollection(movie);
        }
    };

    return (
        <>
        {movie &&
        <Paper className={classes.paper}>
            <Box display="Flex" justifyContent="space-between">
                <Title>{movie.title}</Title>
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder fontSize="large"/>} color="primary" 
                    onChange={event => handleChange(event, movie)} checkedIcon={<Favorite fontSize="large"/>} />}
                />
            </Box>
            <BandeAnnonce movieBa={movie} width='100%' height="620px"/>
            {/* <GenreListButton genres={movie.genres} /> */}
            <Typography variant="subtitle1" gutterBottom>
                Sortie le {dayjs(movie.release_date).locale('fr').format("DD MMMM YYYY")}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {movie.overview}
            </Typography>
        </Paper>
        }
        </>
    )
}
