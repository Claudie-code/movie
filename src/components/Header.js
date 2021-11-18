import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert, Autocomplete } from '@material-ui/lab';
import { 
  TextField, AppBar, Toolbar, MenuItem, Menu, Typography, IconButton, Button, Switch 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
  },
  fontSize: {
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
  marginRight: {
    marginRight: theme.spacing(2)
  },
  search: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1)
  },
  autocomplete: {
    '& .MuiInputBase-input': {
      width: '100%',
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('lg')]: {
        width: 300,
        '&:focus': {
          width: 350,
        },
      },
    }
  },
  categories: {
    display: "none",
    [theme.breakpoints.up('md')]: {
      display: "block",
    },
  }
}));

export default function PrimarySearchAppBar({ popularMovies, darkState, setDarkState}) {
  const classes = useStyles();
  const titleRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(null);
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isSearchOpen = Boolean(searchOpen);

  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.push('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleSearchClose = () => {
    setSearchOpen(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchOpen = (event) => {
    setSearchOpen(event.currentTarget);
  };

  const handleMenuClick = pageURL => {
    history.push(pageURL);
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/search/${titleRef.current.value}`);
  }

  const searchId = 'search-menu';
  const renderSearch = (
    <Menu
      anchorEl={searchOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={searchId}
      keepMounted
      style={{height: "400px"}}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isSearchOpen}
      onClose={handleSearchClose}
    >
      <MenuItem onClick={() => handleMenuClick('/genres')}>Catégories</MenuItem>
      <Autocomplete
        style={{paddingLeft: '20px'}}
        id="movies_select"
        options={popularMovies}
        getOptionLabel={option => option.title}
        className={classes.autocomplete}
        renderOption={(option) => (
          <>
            <img className={classes.marginRight} 
              src={`https://image.tmdb.org/t/p/w92${option.backdrop_path}`} alt={option.title} />
            <Link 
              style={{textDecoration:"none", color: "inherit"}} 
              to={`/movie/${option.id}`}
            >
              {option.title}
            </Link>
          </>
        )}
        renderInput={params => (
          <form className={classes.search} onSubmit={handleSubmit}>
            <TextField {...params}
              variant="outlined"
              label="Recherche un film, une série..."
              size="small"
              color="secondary"
              inputRef={titleRef}
            />
            <IconButton 
              type="submit"
              aria-label="search"
              color="secondary">
              <SearchIcon />
            </IconButton>
          </form>
        )}
      />
    </Menu>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClick("/profile")}>Profile</MenuItem>
      <MenuItem onClick={() => handleMenuClick("/account")}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      { currentUser ? 
        <div>
          <MenuItem onClick={() => handleMenuClick("/profile")}>Profile</MenuItem>
          <MenuItem onClick={() => handleMenuClick("/account")}>My account</MenuItem>
          <MenuItem onClick={() => handleLogout()}>Log out</MenuItem>
          {error && <Alert severity="error">{error}</Alert>}
        </div> :
        <div>
          <MenuItem onClick={() => handleMenuClick("/login")}>Log in</MenuItem>
          <MenuItem onClick={() => handleMenuClick("/signup")}>Sign up</MenuItem>
        </div>
      }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            <MenuItem className={classes.fontSize} onClick={() => handleMenuClick('/')}>MovieTrend</MenuItem>
          </Typography>

          <div className={classes.sectionDesktop}>
          <div className={classes.middleBar}>
            <Button className={classes.categories} onClick={() => handleMenuClick('/genres')} color="inherit">Catégories</Button>
            <Autocomplete
              id="movies_select"
              options={popularMovies}
              getOptionLabel={option => option.title}
              className={classes.autocomplete}
              renderOption={(option) => (
                <>
                  <img className={classes.marginRight} 
                    src={`https://image.tmdb.org/t/p/w92${option.backdrop_path}`} alt={option.title} />
                  <Link 
                    style={{textDecoration:"none", color: "inherit"}} 
                    to={`/movie/${option.id}`}
                  >
                    {option.title}
                  </Link>
                </>
              )}
              renderInput={params => (
                <form className={classes.search} onSubmit={handleSubmit}>
                  <TextField {...params}
                    variant="outlined"
                    label="Recherche un film, une série..."
                    size="small"
                    color="secondary"
                    inputRef={titleRef}
                  />
                  <IconButton 
                    type="submit"
                    aria-label="search"
                    color="secondary">
                    <SearchIcon />
                  </IconButton>
                </form>
              )}
            />
          </div>
          <Switch checked={darkState} onChange={() => setDarkState(!darkState)} />
          { currentUser ? 
            <div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton> 
              <Button onClick={handleLogout} color="inherit">Log out</Button>
              {error && <Alert severity="error">{error}</Alert>}
            </div> :
            <div>
              <Button onClick={() => handleMenuClick("/login")} color="inherit">Log in</Button>
              <Button onClick={() => handleMenuClick("/signup")}  color="inherit">Sign up</Button>
            </div>
          }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton 
              aria-label="open search"
              onClick={handleSearchOpen}
              aria-controls={searchId}
              color="secondary">
              <SearchIcon />
            </IconButton>
            <Switch checked={darkState} onChange={() => setDarkState(!darkState)} />
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderSearch}
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}