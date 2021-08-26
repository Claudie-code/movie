import React from 'react';
import { Box, makeStyles, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    margin: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
}));

export default function GenreListButton(props) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Box>
            {props.genres.map(genre => (
                <Button key={genre.id} size="large" variant="outlined" color="primary" className={classes.margin} onClick={()=> {history.replace(`/genres/${genre.id}/${genre.name}`)}}>
                    {genre.name}
                </Button>
            ))}

        </Box>
    )
}
