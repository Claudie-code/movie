import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Title from "../../components/Title";

/*https://react-bootstrap.github.io/components/carousel/*/


function CarouselAccueil({ popularMovies }) {
    const taille = 1280

    return (
        <React.Fragment>
          <Title>Populaires en ce moment</Title>
            <Carousel >
              {popularMovies && popularMovies.slice(0, 2).map(popularMovie => (
                <Carousel.Item key={popularMovie.id}>
                  <Link to={`/movie/${popularMovie.id}`}>
                    <img
                      className="d-block w-100"
                      src={`https://image.tmdb.org/t/p/w${taille}${popularMovie.backdrop_path}`}
                      alt="First slide"
                    />
                  </Link>
                  <Carousel.Caption>
                    <Typography variant="h3" gutterBottom>{popularMovie.title}</Typography>
                    <Typography variant="body1" gutterBottom>
                      {popularMovie.overview} <br/> Sortie le {popularMovie.release_date}
                    </Typography>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
        </React.Fragment>
    );
}

export default CarouselAccueil;

