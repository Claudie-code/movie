import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    padding: {
        height: "100px",
        width: "400px"
    },
  }));

function Genres({ moviesGenres }) {
    const classes = useStyles();
    const history = useHistory();

    const onClickGenre = (urlID, urlName) => {
        history.push(`/genres/${urlID}/${urlName}`)
    };

    return (
        <Grid container  direction="row"  alignItems="center" spacing={2}>
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