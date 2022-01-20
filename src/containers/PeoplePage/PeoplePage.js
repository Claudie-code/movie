import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { makeStyles, Paper, Typography, Box } from '@material-ui/core';
import Title from '../../components/Title';
import Titleh3 from '../../components/Titleh3';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflowX: "auto",
        flexDirection: "column",
        minHeight: 500,
        gap: theme.spacing(3),
    },
    flex: {
        display: "flex",
        gap: theme.spacing(3)
    }
}));

export default function PeoplePage(props) {
    const classes = useStyles();
    const { id } = props.match.params;
    const [ people, setPeople ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_THEMOVIEDB_KEY}&language=fr-FR`, {
        "method": "GET",
        "headers": {
            "Content-type": "application/json",
        }
        })
        .then(response => response.json())
        .then(json => {
            const data = json;
            setPeople(data)
        })
        .catch(err => {
            console.error(err);
        })
        .finally(
            () => {
            setLoading(false);
            },
        );
    }, [id])
    
    return (
        <>
            {loading ? 
                <Loader /> :
                <Paper className={classes.paper}>
                    <Title>{people.name}</Title>
                    <Box className={classes.flex}>
                        <img 
                            src={`https://image.tmdb.org/t/p/w300${people.profile_path}`} 
                            alt="" 
                        />
                        <Box>
                            <Typography variant="body2" gutterBottom>
                                <strong>Métier</strong> {people.known_for_department}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <strong>Lieu de naissance</strong> {people.place_of_birth}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <strong>Naissance</strong> {dayjs(people.birthday).locale('fr').format("DD MMMM YYYY")}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {people.deathday ?                                
                                    <>
                                        <strong>Décès </strong> 
                                        {dayjs(people.deathday).locale('fr').format("DD MMMM YYYY")}
                                    </> :
                                    <>
                                        <strong>Age </strong> 
                                        {new Date().getFullYear() - people.birthday.split('-')[0] + " ans"}
                                    </>

                                } 
                            </Typography>
                        </Box>
                    </Box>
                    <Titleh3>BIOGRAPHIE</Titleh3>
                    <Typography variant="body1" gutterBottom>
                        {people.biography || "Pas de biographie"}
                    </Typography>
                </Paper>
            }
        </>
    )
}
