import CarouselAccueil from './CarouselAccueil';
import Sorties from './Sorties';
import Series from './Series';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Paper,Grid } from "@material-ui/core";

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
        textDecoration:"none"
    },
}));

function Accueil({ popularMovies, topRatedSeries, seriesGenres }) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {popularMovies && 
                    <Paper className={fixedHeightPaper}>
                        <CarouselAccueil popularMovies={popularMovies} />
                    </Paper>
                }
            </Grid>
            <Grid item xs={12}>
                {popularMovies && 
                    <Paper className={fixedHeightPaper}>
                        <Sorties popularMovies={popularMovies} />
                    </Paper>
                }
            </Grid>
            <Grid item xs={12} >
                {topRatedSeries && 
                    <Paper className={fixedHeightPaper}>
                        <Series seriesGenres={seriesGenres} topRatedSeries={topRatedSeries} />
                    </Paper> 
                }
            </Grid>
        </Grid>
    );
}

export default Accueil;