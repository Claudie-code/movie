import React, { useEffect, useState } from 'react'
import CarouselAccueil from './CarouselAccueil'
import Sorties from './Sorties';
import Series from './Series';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
    const [movies, setMovies] = useState(null);
    const [series, setSeries] = useState(null);
    
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        fetch(`
        https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate`, 
        {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
        })
        .then(response => response.json())
        .then(json => {
            const data = json;
            const arrMovies = data.results
            setMovies(arrMovies)
        })
        .catch(err => {
            console.error(err);
        });
    }, [])

    useEffect(() => {
        fetch(`
        https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&page=1`, 
        {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
        })
        .then(response => response.json())
        .then(json => {
            const data = json;
            const arrSeries = data.results
            setSeries(arrSeries)
        })
        .catch(err => {
            console.error(err);
        });
    }, [])
    console.log(movies)
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