import React, { useEffect, useState } from 'react'
import CarouselAccueil from './CarouselAccueil'
import Sorties from './Sorties';
import Series from './Series';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useApiData } from '../../hooks/useApiData';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflowX: "auto",
        flexDirection: "column",
        minHeight: 470
    },
}));

function Accueil() {
    const movies = useApiData(`
        https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate
    `);
    const series = useApiData(`
        https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&page=1
    `);
    
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    console.log(series,movies)
    
    return (
        <main>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {movies && <Paper className={fixedHeightPaper}><CarouselAccueil moviesCar={movies} /></Paper>}
                    </Grid>
                    <Grid item xs={12}>
                        {movies && <Paper className={fixedHeightPaper}><Sorties moviesSort={movies} /></Paper>}
                    </Grid>
                    <Grid item xs={12} >
                        {series && <Paper className={fixedHeightPaper}><Series seriesTop={series} /></Paper> }
                    </Grid>
                </Grid>
        </main>
    );
}

export default Accueil;