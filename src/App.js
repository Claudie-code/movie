import Genres from './containers/Genres/Genres'
import Header from './components/Header'
import Footer from './components/Footer'
import Accueil from './containers/Accueil/Accueil'
import GenrePage from './containers/GenrePage/GenrePage'
import Signup from './containers/Signup/Signup'
import Login from './containers/Login/Login'
import Profile from './containers/Profile/Profile'
import MoviePage from './containers/MoviePage/MoviePage'
import ForgotPassword from './containers/ForgotPassword/ForgotPassword'
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, cyan, deepPurple, deepOrange } from "@material-ui/core/colors";
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const useStyles = makeStyles(theme => ({
  container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
  },
}));

function App() {
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

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router >
          <Header stateDark={darkState} funcDark={handleThemeChange}/>
          <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path="/" component={Accueil}/>
            <Route exact path="/genre" component={Genres}/>
            <Route exact path="/genre/:id/:name" component={GenrePage}/>
            <Route exact path="/movie/:id" component={MoviePage}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            <PrivateRoute exact path="/profile" component={Profile}/>
          </Switch>
          </Container>
          <Footer />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
