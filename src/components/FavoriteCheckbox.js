import { Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function MoviePage({ serieAndMovie }) {
    const { favorites, addFavoritesUserCollection, removeFavoritesUserCollection, currentUser } = useAuth();
    const [ checked, setChecked ] = useState(false);

    const handleChange = async (event, serieAndMovie) => {
        if (event.target.checked) {
            await addFavoritesUserCollection(serieAndMovie);
            setChecked(true)
        } else {
            await removeFavoritesUserCollection(serieAndMovie);
            setChecked(false)
        }
    };

    useEffect(() => {
        const isFavorite = () => {
            if(favorites.find(favorite => favorite.id === serieAndMovie.id)) {
                setChecked(true);
            } else {
                console.log("false", favorites.find(favorite => favorite.id === serieAndMovie.id))
                setChecked(false);
            }
        };
        if (favorites) isFavorite();
    }, [favorites])

    return (
        <>
            {currentUser && 
                <FormControlLabel style={{margin: 0}}
                    control={
                        <Checkbox 
                            icon={<FavoriteBorder fontSize="large" />} 
                            color="primary" 
                            onChange={event => handleChange(event, serieAndMovie)} 
                            checkedIcon={<Favorite fontSize="large" />} 
                            checked={checked}
                        />}
                />
            }
        </>
    )
}