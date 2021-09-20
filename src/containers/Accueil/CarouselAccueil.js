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
              {popularMovies && popularMovies.slice(0, 3).map(popularMovie => (
                <Carousel.Item key={popularMovie.id}  style={{position: "relative", width:"100%"}}>
                  <Link to={`/movie/${popularMovie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w${taille}${popularMovie.backdrop_path}`}
                      alt={popularMovie.title}
                    >
                      
                    </img>
                    <div style={{position:"absolute", width:"100%", height:"100%",top:0, background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,.45) 75%, rgba(0,0,0,.60) 85%, rgba(0,0,0,.75) 90%, rgba(0,0,0,0.90) 100%)"}}></div>
                  </Link>
                  <Carousel.Caption>
                    <Typography variant="h3" gutterBottom>{popularMovie.title}</Typography>
                    <Typography variant="body1" gutterBottom>
                      {popularMovie.overview.slice(0,200) + "..."} <br/> Sortie le {popularMovie.release_date}
                    </Typography>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
        </React.Fragment>
    );
}

export default CarouselAccueil;

