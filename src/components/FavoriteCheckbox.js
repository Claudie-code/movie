import { Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function MoviePage({ movie }) {
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
                if (docRef.data().favorites) isFavorite(docRef.data().favorites);
            } else {
                console.log("Cette collection n'existe pas");
            }
        }
        fetchData();
    }, []);

    return (
        <FormControlLabel style={{margin: 0}}
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