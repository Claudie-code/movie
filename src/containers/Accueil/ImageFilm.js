import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
  playIcon: {
    color: "white",
    height: 40,
    width: 40,
    border: "2px solid white",
    borderRadius: "50%",
    '&:hover': {
      color: theme.palette.primary.main,
      border: "2px solid" + theme.palette.primary.main,
    }
  },
}));

function ImageFilm({ popularMovie }) {
    const classes = useStyles();

    return (
        <CardActionArea className={classes.root}>
            <CardMedia
            className={classes.cover}
            image={`https://image.tmdb.org/t/p/w780${popularMovie.poster_path}`}
            title={popularMovie.title}
            >
                <IconButton aria-label="play/pause">
                    <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
            </CardMedia>          
      </CardActionArea>
    );
}

export default ImageFilm;