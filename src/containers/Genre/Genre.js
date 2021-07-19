import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    padding: {
        height: "100px",
        width: "400px",
        '&:hover': {
            color: "inherit",
        }
    },
  }));

function Genre(props) {
    const classes = useStyles();
    const [genre, setGenre] = useState([]) 

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
        setGenre(data.genres)
    })
    .catch(err => {
        console.error(err);
    });
    }, [])

    return (
        <main >
        <Grid container  direction="row"  alignItems="center" spacing={2}>
        {genre.map(genre => (
            <Grid item >
                <Button href={`/genre/${genre.id}/${genre.name}`} variant="contained" color="primary" className={classes.padding}>
                    {genre.name}
                </Button>
            </Grid>
        ))}
        </Grid>
        </main>
    );
}

export default Genre;