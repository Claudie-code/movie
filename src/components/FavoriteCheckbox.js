import { Checkbox, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    position: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 0
    },
}));

export default function MoviePage({ movie }) {
    const classes = useStyles();
    const { getFavorites, addFavoritesUserCollection, removeFavoritesUserCollection } = useAuth();
    const [ checked, setChecked ] = useState(false);

    const handleChange = async (event, movie) => {
        if (event.target.checked) {
            await addFavoritesUserCollection(movie);
            setChecked(true)
        } else {
            await removeFavoritesUserCollection(movie);
            setChecked(false)
        }
    };

    const isFavorite = (favorites) => {
        if(favorites.find(favorite => favorite.id === movie.id)) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    };

    useEffect(() => {
        async function fetchData() {
            const docRef = await getFavorites();

            if (docRef.exists) {
                console.log(docRef.data().favorites)
                if (docRef.data().favorites) isFavorite(docRef.data().favorites);
            } else {
                console.log("Cette collection n'existe pas");
            }
        }
        fetchData();
    }, []);

    return (
        <FormControlLabel className={classes.position}
            control={
                <Checkbox 
                    icon={<FavoriteBorder fontSize="large" />} 
                    color="primary" 
                    
                    onChange={event => handleChange(event, movie)} 
                    checkedIcon={<Favorite fontSize="large" />} 
                    checked={checked}
                />}
        />
    )
}