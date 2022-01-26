import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Switch } from '@material-ui/core';
import AuthModal from '../AuthModal/AuthModal';
import AutocompleteSearch from './AutocompleteSearch';
import SearchBar from './SearchBar';
import MenuHeader from './MenuHeader';
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  fontSize: {
    fontWeight: 400,
    textTransform: "none",
    fontSize: "1.2rem",
    [theme.breakpoints.up('sm')]: {
      fontSize: "1.7rem"
    },
  },
  middleBar: {
    display: "flex",
    margin: "auto",
    gap: theme.spacing(2)
  },
  sectionDesktop: {
    display: 'none',
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    },
  },
  categories: {
    display: "none",
    [theme.breakpoints.up('md')]: {
      display: "block",
    },
  }
}));

export default function PrimarySearchAppBar({ darkState, setDarkState}) {
  const classes = useStyles();
  const history = useHistory();
  const { currentUser } = useAuth();

  const handlePush = pageURL => {
    history.push(pageURL);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1">
            <Button className={classes.fontSize} onClick={() => handlePush('/')}>MovieTrend</Button>
          </Typography>

          <div className={classes.sectionDesktop}>
            <div className={classes.middleBar}>
              <Button className={classes.categories} onClick={() => handlePush('/genres')}>Catégories</Button>
              <AutocompleteSearch />
            </div>
            <Switch checked={darkState} onChange={() => setDarkState(!darkState)} />
            {currentUser && 
              <Typography variant="subtitle1" component="h3">
                Hi, {currentUser?.displayName?.split(' ')[0]}
              </Typography>
            }
            <MenuHeader 
              handlePush={handlePush} 
              currentUser={currentUser}
            />
          </div>
          
          <div className={classes.sectionMobile}>
            <SearchBar handlePush={handlePush} />
            <Switch checked={darkState} onChange={() => setDarkState(!darkState)} />
            <MenuHeader 
              handlePush={handlePush} 
              currentUser={currentUser}
            />
          </div>
        </Toolbar>
      </AppBar>
      <AuthModal />
    </div>
  );
}