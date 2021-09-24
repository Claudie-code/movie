import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import PlayButton from '../../components/PlayButton';

const useStyles = makeStyles((theme) => ({
  root: {
      width: 150,
      height: 200,
  },
  cover: {
    width: 150,
    height: 200,
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
  },
}));

function ImageFilm({ popularMovie }) {
    const classes = useStyles();

    return (
      <CardActionArea className={classes.root} href={`/movie/${popularMovie.id}`}>
        <CardMedia
          className={classes.cover}
          image={`https://image.tmdb.org/t/p/w780${popularMovie.poster_path}`}
          title={popularMovie.title}
        >
          <PlayButton />
        </CardMedia>          
      </CardActionArea>
    );
}

export default ImageFilm;