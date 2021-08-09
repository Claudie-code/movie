import { makeStyles, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Title from "../../components/Title";
import { useAuth } from '../../contexts/AuthContext';
import BandeAnnonce from "../Accueil/BandeAnnonce";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflowX: "auto",
        flexDirection: "column",
        minHeight: 450
    },
}));

export default function PageMovie(props) {
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
        console.log("data", data.title)
        setMovie(data)
    })
    .catch(err => {
        console.error(err);
    });
    }, [])

    console.log(movie)
    return (
        <>
        {movie &&
        <Paper className={classes.paper}>
            <Title>{movie.title}</Title>
            <BandeAnnonce movieBa={movie}/>
            <div>bnojour</div>
        </Paper>
        }
        </>
    )
}
