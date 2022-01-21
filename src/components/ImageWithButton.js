import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import PlayButton from './PlayButton';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 400,
  },
  cover: {
    height: "100%",
    paddingTop: "110%",
    objectFit: "contain",
  },
  content: {
    background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,.45) 35%, rgba(0,0,0,.60) 50%, rgba(0,0,0,.75) 75%, rgba(0,0,0,0.90) 100%)",
    color: "#fff",
    width: "100%",
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
  }
}));

function ImageWithButton({ data }) {
    const classes = useStyles();

    return (
      <CardActionArea className={classes.root} href={`/movie/${data.id}`}>
        <CardMedia
          className={classes.cover}
          image={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
          title={data.title}
        >
          <div className={classes.content}>
            <PlayButton />
          </div>
        </CardMedia>          
      </CardActionArea>
    );
}

export default ImageWithButton;