import { makeStyles } from '@material-ui/core/styles';
import { Typography, CardContent, CardMedia, CardActionArea } from '@material-ui/core';
import PlayButton from '../../components/PlayButton';
import ReleaseDate from '../../components/ReleaseDate';
import FavoriteCheckbox from '../../components/FavoriteCheckbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexBasis: "100%",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: theme.spacing(1),
    '@media (min-width:750px)': {
      flexBasis: "48%",
    },
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
    width: 120,
    height: 200,
    '@media (min-width:850px)': {
      width: 100,
      height: 150,
    },
    '@media (min-width:850px)': {
      width: 200,
      height: 280,
    },
    '@media (min-width:1200px)': {
      width: 100,
      height: 150,
    },
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