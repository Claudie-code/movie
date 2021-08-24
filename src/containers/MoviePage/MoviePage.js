import { makeStyles, Paper, Typography, Box, Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Title from "../../components/Title";
import { useAuth } from '../../contexts/AuthContext';
import BandeAnnonce from "../../components/BandeAnnonce";
import GenreListButton from "../../components/GenreListButton";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import Rating from '@material-ui/lab/Rating';
import FavoriteCheckBox from '../../components/FavoriteCheckbox';

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
    const [ movie, setMovie ] = useState(null);

    const handleChange = async (event, movie) => {
        if (event.target.checked) {
            await addFavoritesUserCollection(movie);
        } else {
            await removeFavoritesUserCollection(movie);
        }
    };

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

    return (
        <>
        {movie &&
        <Paper className={classes.paper}>
            <Box display="Flex" justifyContent="space-between">
                <Title>{movie.title}</Title>
                <FavoriteCheckBox movie={movie}/>
            </Box>
            <BandeAnnonce movieBa={movie} width='100%' height="620px"/>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <GenreListButton genres={movie.genres} />
                <Rating name="size-medium" value={(movie.vote_average * 5) / 10} readOnly />
            </Box>
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
