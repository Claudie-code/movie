import { makeStyles } from '@material-ui/core/styles';
import { Typography, CardContent, CardMedia, CardActionArea } from '@material-ui/core';
import PlayButton from '../../components/PlayButton';
import ReleaseDate from '../../components/ReleaseDate';
import FavoriteCheckbox from '../../components/FavoriteCheckbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: theme.spacing(1),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0',
    paddingLeft: theme.spacing(1),
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
      <CardActionArea 
        style={{textDecoration: "none", color:"inherit"}}
        className={classes.root} 
        href={`/movie/${popularMovie.id}`}>
        <CardMedia
          className={classes.cover}
          image={`https://image.tmdb.org/t/p/w780${popularMovie.poster_path}`}
          title={popularMovie.original_title}
        />
        <div className={classes.details}>
          <div>
            <PlayButton />
            <FavoriteCheckbox serieAndMovie={popularMovie} />
          </div>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {popularMovie.title}
            </Typography>
            <ReleaseDate>{popularMovie.release_date}</ReleaseDate>
          </CardContent>
        </div>
      </CardActionArea>
  );
}