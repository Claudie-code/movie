import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';

const useStyles = makeStyles((theme) => ({
    padding: {
        height: "75px",
        width: "380px"
    },
  }));

function Genres() {
    const classes = useStyles();
    const history = useHistory();
    const { moviesGenres } = useData();

    const onClickGenre = (urlID, urlName) => {
        history.push(`/genres/${urlID}/${urlName}`)
    };

    return (
        <Grid container  
            direction="row"  
            alignItems="center" 
            justifyContent="center" 
            spacing={3}
            style={{marginTop:"3rem", marginBottom:"3rem"}}
        >
        {moviesGenres.map(genre => (
            <Grid item key={genre.id}>
                <Button onClick={() => onClickGenre(genre.id, genre.name)} variant="contained" color="primary" className={classes.padding}>
                    {genre.name}
                </Button>
            </Grid>
        ))}
        </Grid>
    );
}

export default Genres;