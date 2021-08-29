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
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import {BrowserRouter as Route, Switch} from 'react-router-dom';
import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, cyan, deepPurple, deepOrange } from "@material-ui/core/colors";
import CssBaseline from '@material-ui/core/CssBaseline';
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
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <Header popularMovies={popularMovies} darkState={darkState} setDarkState={setDarkState}/>
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/">
                <Accueil popularMovies={popularMovies} topRatedSeries={topRatedSeries} moviesGenres={moviesGenres} />
              </Route>
              <Route exact path="/genres">
                <Genres genres={moviesGenres} />
              </Route>
              <Route exact path="/genres/:id/:name">
                <GenrePage />
              </Route>
              <Route exact path="/movie/:id">
                <MoviePage />
              </Route>
              <Route exact path="/rechercher">
                <SearchPage />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/forgot-password">
                <ForgotPassword />
              </Route>
              <PrivateRoute exact path="/profile">
                <Profile />
              </PrivateRoute>
            </Switch>
          </Container>
          <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
