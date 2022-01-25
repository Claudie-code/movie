import { useData } from '../../contexts/DataContext';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { Link, useHistory } from 'react-router-dom';
import { IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
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
    marginRight: {
        marginRight: theme.spacing(2)
    },
}));

function AutocompleteSearch(props) {
    const history = useHistory();
    const { popularMovies } = useData();
    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        history.push(`/search/${event.target[0].value}`);
    };

    return (
        <Autocomplete
            id="movies_select"
            options={popularMovies || []}
            getOptionLabel={option => option.title}
            className={classes.autocomplete}
            renderOption={(option) => (
            <>
                <img 
                    className={classes.marginRight} 
                    src={`https://image.tmdb.org/t/p/w92${option.backdrop_path}`} 
                    alt={option.title} 
                />
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
                    label="Rechercher un film, une série..."
                    size="small"
                    color="secondary"
                />
                <IconButton 
                    type="submit"
                    aria-label="search"
                    color="secondary"
                >
                <SearchIcon />
                </IconButton>
            </form>
            )}
        />
    );
}

export default AutocompleteSearch;