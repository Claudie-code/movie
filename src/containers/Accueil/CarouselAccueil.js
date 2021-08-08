import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Title from "../../components/Title";

/*https://react-bootstrap.github.io/components/carousel/*/


function CarouselAccueil(props) {
    const movies = props.moviesCar[0]
    const movies2 = props.moviesCar[1]
    const movies3 = props.moviesCar[2]
    const taille = 1280

    return (
        <React.Fragment>
          <Title>Populaires en ce moment</Title>
            <Carousel >
              <Carousel.Item>
                <Link href="/ok">
                <img
                  className="d-block w-100"
                  src={`https://image.tmdb.org/t/p/w${taille}${movies && movies.backdrop_path}`}
                  alt="First slide"
                />
                
                <Carousel.Caption>
                  <Typography variant="h3" gutterBottom>{movies && movies.title}</Typography>
                  <Typography variant="body1" gutterBottom>
                    {movies && movies.overview} <br/> Sortie le {movies && movies.release_date}
                  </Typography>
                </Carousel.Caption>
                </Link>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`https://image.tmdb.org/t/p/w${taille}${movies2 && movies2.backdrop_path}`}
                  alt="Second slide"
                />

              <Carousel.Caption>
                <Typography variant="h3" gutterBottom>{movies2 && movies2.original_title}</Typography>
                <Typography variant="body1" gutterBottom>
                  {movies2 && movies2.overview} <br/> Sortie le {movies2 && movies2.release_date}
                </Typography>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/w${taille}${movies3 && movies3.backdrop_path}`}
                alt="Third slide"
              />

              <Carousel.Caption>
                <Typography variant="h3" gutterBottom>{movies3 && movies3.original_title}</Typography>
                <Typography variant="body1" gutterBottom>
                  {movies3 && movies3.overview} <br/> Sortie le {movies3 && movies3.release_date}
                </Typography>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

        </React.Fragment>
    );
}

export default CarouselAccueil;

