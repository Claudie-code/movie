import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CardContent, CardMedia, CardActionArea } from '@material-ui/core';
import PlayButton from '../../components/PlayButton';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: theme.spacing(1)
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0',
    paddingLeft: theme.spacing(1)
  },
  content: {
    flex: '1 0',
    padding: theme.spacing(0),
    '&:last-child': {
      padding: theme.spacing(0),
    }
  },
  cover: {
    width: 100,
    height: 150
  },
}));

export default function MediaControlCard({ popularMovie }) {
  const classes = useStyles();
  
  return (
      <CardActionArea className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={`https://image.tmdb.org/t/p/w780${popularMovie.poster_path}`}
          title={popularMovie.original_title}
        />
        <div className={classes.details}>
          <div>
            <PlayButton />
          </div>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {popularMovie.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Sortie le {dayjs(popularMovie.release_date).locale('fr').format("DD MMMM YYYY")}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
  );
}