import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import PlayButton from '../../components/PlayButton';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 270,
    '@media (min-width:500px)': {
      height: 400,
    },
    '@media (min-width:600px)': {
      height: 230,
    },
    '@media (min-width:800px)': {
      height: 300,
    },
    '@media (min-width:1000px)': {
      height: 400,
    },
    '@media (min-width:1200px)': {
      height: 240,
    },
  },
  cover: {
    height: "100%",
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