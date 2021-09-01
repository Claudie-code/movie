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
        gap: "1%"
    },
    flexItem: {
        height: "620px",
        overflow: "hidden"
    },
}));

function Sorties({ popularMovies }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Title>Bandes annonces à ne pas manquer</Title>
            <Box className={classes.flex}>
                <Box className={classes.flexItem} style={{width: '59%'}}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <BandeAnnonce movieOrSerie={popularMovies[4]} height="400px" width="100%"/>
                        </Grid>
                        {popularMovies.slice(4, 8).map(popularMovie => (
                            <Grid key={popularMovie.id} item xs={3}>
                                <ImageFilm popularMovie={popularMovie}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box className={classes.flexItem} style={{width: '39%'}}>
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