import CarouselAccueil from './CarouselAccueil';
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

function Accueil({ popularMovies, topRatedSeries }) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    return (
        <main>
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
                                <Series topRatedSeries={topRatedSeries} />
                            </Paper> 
                        }
                    </Grid>
                </Grid>
        </main>
    );
}

export default Accueil;