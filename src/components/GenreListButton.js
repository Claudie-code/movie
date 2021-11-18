import { Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        gap: "2%",
        flexWrap: "wrap",
        width: "100%",
    }
}));

export default function GenreListButton(props) {
    const history = useHistory();
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            {props.genres && props.genres.map(genre => (
                <Button 
                    key={genre.id} 
                    size="large" 
                    variant="outlined" 
                    color="primary"
                    onClick={()=> {history.replace(`/genres/${genre.id}/${genre.name}`)}}
                >
                    {genre.name}
                </Button>
            ))}
        </Box>
    )
}
