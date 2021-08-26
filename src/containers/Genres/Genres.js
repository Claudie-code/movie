import React, { useEffect, useState } from 'react'
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

function Genres(props) {
    const classes = useStyles();
    const [genres, setGenres] = useState([]) 
    const history = useHistory();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR`, {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
    })
    .then(response => response.json())
    .then(json => {
        const data = json;
        setGenres(data.genres)
    })
    .catch(err => {
        console.error(err);
    });
    }, [])

    const onClickGenre = (urlID, urlName) => {
        history.push(`/genres/${urlID}/${urlName}`)
    };

    return (
        <main >
        <Grid container  direction="row"  alignItems="center" spacing={2}>
        {genres.map(genre => (
            <Grid item >
                <Button onClick={() => onClickGenre(genre.id, genre.name)} variant="contained" color="primary" className={classes.padding}>
                    {genre.name}
                </Button>
            </Grid>
        ))}
        </Grid>
        </main>
    );
}

export default Genres;