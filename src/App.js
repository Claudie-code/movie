import Genre from './containers/Genre/Genre'
import Header from './components/Header'
import Footer from './components/Footer'
import Accueil from './containers/Accueil/Accueil'
import PageGenre from './containers/PageGenre/PageGenre'
import Signup from './containers/Signup/Signup'
import Login from './containers/Login/Login'
import Profile from './containers/Profile/Profile'
import ForgotPassword from './containers/ForgotPassword/ForgotPassword'
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const useStyles = makeStyles(theme => ({
  container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
  },
}));
/*https://material-ui.com/customization/palette/#dark-mode*/
/*https://medium.com/heuristics/react-dark-mode-switch-in-material-ui-dashboard-82fcf1cded66*/
function App() {
  const classes = useStyles();

  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[600];
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

  /*https://codesandbox.io/s/dark-theme-switch-tp37c?from-embed=&file=/src/Dashboard/Dashboard.js*/
  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router >
          <Header stateDark={darkState} funcDark={handleThemeChange}/>
          <Switch>
          <Container maxWidth="lg" className={classes.container}>
            <Route exact path="/" component={Accueil}/>
            <Route exact path="/genre" component={Genre}/>
            <Route exact path="/genre/:id/:name" component={PageGenre}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            <PrivateRoute exact path="/profile" component={Profile}/>
          </Container>
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
