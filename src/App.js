import Genres from './containers/Genres/Genres'
import Header from './components/Header'
import Footer from './components/Footer'
import Accueil from './containers/Accueil/Accueil'
import GenrePage from './containers/GenrePage/GenrePage'
import Signup from './containers/Signup/Signup'
import Login from './containers/Login/Login'
import Profile from './containers/Profile/Profile'
import SearchPage from './containers/SearchPage/SearchPage'
import MoviePage from './containers/MoviePage/MoviePage'
import ForgotPassword from './containers/ForgotPassword/ForgotPassword'
import Container from '@material-ui/core/Container';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, { useState } from "react";
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { orange, cyan, deepPurple, deepOrange } from "@material-ui/core/colors";
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { useApiData } from './hooks/useApiData';

const useStyles = makeStyles(theme => ({
  container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
  },
}));

function App() {
  const popularMovies = useApiData(`
    https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate
  `);
  const topRatedSeries = useApiData(`
    https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR&page=1
  `);
  const moviesGenres = useApiData(`
    https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR
  `);

  const seriesGenres = useApiData(`
    https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR
  `);

  const classes = useStyles();

  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[600] : cyan[600];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });

  return (
    <AuthProvider>
        {console.log(moviesGenres)}
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
          <Header popularMovies={popularMovies} darkState={darkState} setDarkState={setDarkState}/>
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/" 
                render={props => (
                  <Accueil {...props}
                    popularMovies={popularMovies} 
                    topRatedSeries={topRatedSeries} 
                    moviesGenres={moviesGenres} 
                    seriesGenres={seriesGenres}
                  />
                )}
              />
              <Route exact path="/genres" render={props => <Genres {...props} genres={moviesGenres} />} />
              <Route exact path="/genres/:id/:name" component={GenrePage} />
              <Route exact path="/movie/:id" component={MoviePage} />
              <Route exact path="/search/:search" component={SearchPage} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path="/profile" component={Profile} />
            </Switch>
          </Container>
          <Footer />
          </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
