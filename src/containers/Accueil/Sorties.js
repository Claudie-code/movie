import React from 'react';
import BandeAnnonce from "../../components/BandeAnnonce"
import ButtonMovie from "./ButtonMovie"
import Grid from '@material-ui/core/Grid';
import ImageFilm from './ImageFilm';
import "./accueil.css";
import Title from "../../components/Title";
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    flex: {
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        '@media (min-width:1200px)': {
            flexDirection: "row"
        },
    },
    firstItem: {
        width: '100%',
        '@media (min-width:1200px)': {
            width: '59%'
        },
    },
    secondItem: {
        height: "880px",
        overflow: "hidden",
        '@media (min-width:750px)': {
            height: "100%",
        },
        '@media (min-width:850px)': {
            width: '100%',
            overflow: "hidden",
            height: "550px",
        },
        '@media (min-width:1200px)': {
            width: '39%',
            height: "655px",
        },
    },
    grid: {
        '@media (max-width:430px)': {
            flexDirection: "column",
            alignItems: "center"
        },
    },
    imageGrid: {
        '@media (max-width:430px)': {
            width: '100%',
        },
    },
    trailer: {
        width: '100%',
    }
}));

function Sorties({ popularMovies }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Title>Bandes annonces à ne pas manquer</Title>
            <Box className={classes.flex}>
                <Box className={classes.firstItem}>
                    <Grid container spacing={2} className={classes.grid}>
                        <Grid item xs={12} className={classes.trailer}>
                            <BandeAnnonce movieOrSerieData={popularMovies[4]} movieOrSerie="movie"/>
                        </Grid>
                        {popularMovies.slice(4, 8).map(popularMovie => (
                            <Grid key={popularMovie.id} item 
                                xs={6} sm={3}
                                className={classes.imageGrid}>
                                <ImageFilm popularMovie={popularMovie}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box className={classes.secondItem}>
                    <div className="slides">
                        {popularMovies.slice(8, 14).map(popularMovie => (
                            <ButtonMovie key={popularMovie.id} popularMovie={popularMovie}/>
                        ))}
                    </div>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default Sorties;