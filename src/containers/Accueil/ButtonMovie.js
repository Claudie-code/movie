import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  playIcon: {
    color: theme.palette.action.active,
    height: 40,
    width: 40,
    border: "2px solid" + theme.palette.action.active,
    borderRadius: "50%",
    '&:hover': {
      color: theme.palette.primary.main,
      border: "2px solid" + theme.palette.primary.main,
    }
  },
}));
/*https://github.com/react-component/slider*/
export default function MediaControlCard(props) {
  const classes = useStyles();
  
  return (
      <CardActionArea className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={`https://image.tmdb.org/t/p/w780${props.movieBu && props.movieBu.poster_path}`}
          title={props.movieBu && props.movieBu.original_title}
        />
        <div className={classes.details}>
          <div className={classes.controls}>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
          </div>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.movieBu && props.movieBu.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Sortie le {props.movieBu && props.movieBu.release_date}
            </Typography>
          </CardContent>

        </div>
      </CardActionArea>
  );
}