import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Autocomplete } from '@material-ui/lab';
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
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  fontSize: {
    fontSize: "1.7rem"
  },
  middleBar: {
    display: "flex",
    margin: "auto"
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: "center"
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  marginRight: {
    marginRight: theme.spacing(2)
  },
  search: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1)
  }
}));

export default function PrimarySearchAppBar({ popularMovies, darkState, setDarkState}) {
  const classes = useStyles();
  const titleRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
          <MenuItem className={classes.fontSize} onClick={() => handleMenuClick('/')}>MovieTrend</MenuItem>
          </Typography>
          <div className={classes.middleBar}>
            <Button className={classes.marginRight} onClick={() => handleMenuClick('/genres')} color="inherit">Catégories</Button>
            <Autocomplete
              id="movies_select"
              options={popularMovies}
              getOptionLabel={option => option.title}
              style={{ width: 500 }}
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
          <div className={classes.sectionDesktop}>
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
            </div> :
            <div>
              <Button onClick={() => handleMenuClick("/login")} color="inherit">Log in</Button>
              <Button onClick={() => handleMenuClick("/signup")}  color="inherit">Sign up</Button>
            </div>
          }
          </div>
          <div className={classes.sectionMobile}>
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
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}