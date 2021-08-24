import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Title from "../../components/Title";

/*https://react-bootstrap.github.io/components/carousel/*/


function CarouselAccueil(props) {
    const movie1 = props.moviesCar[0]
    const movie2 = props.moviesCar[1]
    const movie3 = props.moviesCar[2]
    const taille = 1280

    return (
        <React.Fragment>
          <Title>Populaires en ce moment</Title>
            <Carousel >
              <Carousel.Item>
                <Link to={`/movie/${movie1.id}`}>
                  <img
                    className="d-block w-100"
                    src={`https://image.tmdb.org/t/p/w${taille}${movie1 && movie1.backdrop_path}`}
                    alt="First slide"
                  />
                </Link>
                <Carousel.Caption>
                  <Typography variant="h3" gutterBottom>{movie1 && movie1.title}</Typography>
                  <Typography variant="body1" gutterBottom>
                    {movie1 && movie1.overview} <br/> Sortie le {movie1 && movie1.release_date}
                  </Typography>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Link to={`/movie/${movie1.id}`}>
                  <img
                    className="d-block w-100"
                    src={`https://image.tmdb.org/t/p/w${taille}${movie2 && movie2.backdrop_path}`}
                    alt="Second slide"
                  />
                </Link>
              <Carousel.Caption>
                <Typography variant="h3" gutterBottom>{movie2 && movie2.original_title}</Typography>
                <Typography variant="body1" gutterBottom>
                  {movie2 && movie2.overview} <br/> Sortie le {movie2 && movie2.release_date}
                </Typography>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Link to={`/movie/${movie1.id}`}>
                <img
                  className="d-block w-100"
                  src={`https://image.tmdb.org/t/p/w${taille}${movie3 && movie3.backdrop_path}`}
                  alt="Third slide"
                />
              </Link>
              <Carousel.Caption>
                <Typography variant="h3" gutterBottom>{movie3 && movie3.original_title}</Typography>
                <Typography variant="body1" gutterBottom>
                  {movie3 && movie3.overview} <br/> Sortie le {movie3 && movie3.release_date}
                </Typography>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

        </React.Fragment>
    );
}

export default CarouselAccueil;

