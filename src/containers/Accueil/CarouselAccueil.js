import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Title from "../../components/Title";
import { makeStyles } from "@material-ui/core/styles";
import ReleaseDate from '../../components/ReleaseDate';

const useStyles = makeStyles(theme => ({
  carousel: {
    position: "relative", 
    width:"100%",
    height: 0,
    overflow: "hidden",
    paddingBottom: "56.25%"
  },
  image: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    position:"absolute", 
    width:"100%", 
    height:"100%",
    top:0, 
    background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,.45) 75%, rgba(0,0,0,.60) 85%, rgba(0,0,0,.75) 90%, rgba(0,0,0,0.90) 100%)"
  },
  text: {
    '@media (max-width: 700px)': {
      display: "none"
    },
  }
}));

function CarouselAccueil({ popularMovies }) {
  const classes = useStyles();
  const taille = 1280

  return (
      <React.Fragment>
        <Title>Populaires en ce moment</Title>
          <Carousel >
            {popularMovies && popularMovies.slice(0, 3).map(popularMovie => (
              <Carousel.Item key={popularMovie.id}  className={classes.carousel}>
                <Link to={`/movie/${popularMovie.id}`}>
                  <img
                    className={classes.image}
                    src={`https://image.tmdb.org/t/p/w${taille}${popularMovie.backdrop_path}`}
                    alt={popularMovie.title}
                  >
                  </img>
                  <div className={classes.overlay}></div>
                </Link>
                <Carousel.Caption>
                  <Typography variant="h3">{popularMovie.title}</Typography>
                  <Typography className={classes.text} variant="body1" gutterBottom>
                    {popularMovie.overview.slice(0,200) + "..."}
                    <ReleaseDate color="inherit">{popularMovie.release_date}</ReleaseDate>
                  </Typography>

                </Carousel.Caption>
              </Carousel.Item>
            ))}
        </Carousel>
      </React.Fragment>
  );
}

export default CarouselAccueil;

