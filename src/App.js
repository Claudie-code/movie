import Genres from './containers/Genres/Genres';
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './containers/Accueil/Accueil';
import GenrePage from './containers/GenrePage/GenrePage';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import Profile from './containers/Profile/Profile';
import Account from './containers/Account/Account';
import SearchQueryPage from './containers/SearchQueryPage/SearchQueryPage';
import MoviePage from './containers/MoviePage/MoviePage';
import SeriePage from './containers/SeriePage/SeriePage';
import Loader from './components/Loader/Loader';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';
import Container from '@material-ui/core/Container';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, { useState } from "react";
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { orange, cyan, deepPurple, deepOrange } from "@material-ui/core/colors";
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { useData } from './contexts/DataContext';

const useStyles = makeStyles(theme => ({
  container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
  },
}));

function App() {
  const { loadingSeries, loadingMovies } = useData();
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
      },
    },  
    typography: {
      h2: {
        fontSize: '1.6rem',
        '@media (min-width:500px)': {
          fontSize: '2.2rem',
        },
        '@media (min-width:850px)': {
          fontSize: '3rem',
        },
      },
      h3: {
        fontSize: '1.3rem',
        '@media (min-width:500px)': {
          fontSize: '1.8rem',
        },
        '@media (min-width:850px)': {
          fontSize: '2.8rem',
        },
      },
      h5: {
        fontSize: '1rem',
        '@media (min-width:500px)': {
          fontSize: '1.2rem',
        },
        '@media (min-width:850px)': {
          fontSize: '1.5rem',
        },
      }
    }
  });

  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
          <Header darkState={darkState} setDarkState={setDarkState}/>
          <Container component="main" maxWidth="lg" className={classes.container}>
            {loadingMovies && loadingSeries ?
              <Loader /> :
              <Switch>
                <Route exact path="/" component={Accueil} />
                <Route exact path="/genres" component={Genres} />
                <Route exact path="/genres/:id/:name" component={GenrePage} />
                <Route exact path="/movie/:id" component={MoviePage} />
                <Route exact path="/serie/:id" component={SeriePage} />
                <Route exact path="/search/:search" component={SearchQueryPage} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/account" component={Account} />
              </Switch>
            }
          </Container>
          <Footer />
          </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
